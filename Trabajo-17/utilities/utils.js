import knex from "knex";
import uniqid from "uniqid";
import { SQLITE_CONFIG, MYSQL_CONFIG } from "../options/globals.js";
export const KNEX_APP = knex(SQLITE_CONFIG);

class HistorialSQLITE {
    #KNEX_APP
    
    constructor(){
        this.#KNEX_APP = knex(SQLITE_CONFIG);
    }

    async leerHistorial(callback){
        try{
            callback(await this.#KNEX_APP("HISTORIAL").select("*"));
        }catch(error){
            console.log(error);
        }
    }

    async guardarAlHistorial(data){
        const {time_info,mail,mensaje} = data;
        try{
            await this.#KNEX_APP("HISTORIAL").insert({id : uniqid(),mail,time : time_info,contenido : mensaje});
        }catch(error){
            console.log(error);
        }
    }
}

class ProductosMYSQL {
    #KNEX_APP
    
    constructor(){
        this.#KNEX_APP = knex(MYSQL_CONFIG);
    }

    async leerProductos(callback){
        try{
            callback(await this.#KNEX_APP("listado").select("*"));
        }catch(error) {
            console.log(error);
        }
    }

    async guardarProductos(data){
        const {title,price,thumbail} = data;
        try{
            await this.#KNEX_APP("listado").insert({title,price,thumbail});
        }catch(error){
            console.log(error);
        }
    }
}

export const HistorialDB = new HistorialSQLITE();
export const ProductosDB = new ProductosMYSQL();
