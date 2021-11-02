import mongoose from "mongoose";
import models from "../options/models.js";
import uniqid from "uniqid";
import {schema,normalize} from "normalizr";
import util from "util";

export class EcommerceMDB {
    #MONDB
    #CONNECTION

    constructor(conexion){
        this.#CONNECTION = conexion;
        this.Connection();
    }

    async Connection(){
        try{
            this.#MONDB = await mongoose.connect(this.#CONNECTION,{
                useNewUrlParser:true,
                useUnifiedTopology:true,
                serverSelectionTimeoutMS:1000
            });
            console.log("Base conectada");
        }catch(error){
            console.log(error);
        }
    }

    getConnection(){
        return this.#CONNECTION;
    }

    setConnection(nueva_con){
        this.#CONNECTION = nueva_con;
    }

    async GuardarProducto(producto){
        const {title,price,thumbail} = producto;
        try{
            const query = await models.PRODUCTOS_MODEL.insertMany({p_id:uniqid(),title,price,thumbail});
        }catch(error){
            console.log(error);
        }
    }

    async LeerProductos(callback){
        try{
            const query = await models.PRODUCTOS_MODEL.find();
            await callback(query);
        }catch(error){
            console.log(error); 
        }
    }

    async GuardarMensaje(mensaje){
        try{
            const query = await models.MENSAJES_MODEL.insertMany(mensaje);
        }catch(error){
            console.log(error);
        } 
    }

    async LeerMensajes(callback){
        try{
            const query = await models.MENSAJES_MODEL.find();    
            const schemaAuthor = new schema.Entity("author",{
                id : new schema.Entity("id"),
                nombre : new schema.Entity("nombre"),
                apellido : new schema.Entity("apellido"),
                edad : new schema.Entity("edad"),
                alias : new schema.Entity("alias"),
                avatar : new schema.Entity("avatar"),
            },{idAttribute:"id"});

            const nor = normalize(query,schemaAuthor);
            console.log(util.inspect(nor,false,12,true));
            await callback(query);
        }catch(error){
            console.log(error);
        }
    }

    async TerminateConnection(){
        await mongoose.connection.close();
    }
}