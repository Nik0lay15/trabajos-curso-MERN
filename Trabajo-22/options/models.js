import mongoose from "mongoose";

const PRODUCTOS_SCHEMA = new mongoose.Schema({
    p_id : {type:String, required:true},
    price : {type:Number,required:true},
    title : {type:String,required:true},
    thumbail : {type:String,required:true}
});  

const MENSAJES_SCHEMA = new mongoose.Schema({
    author : {
        id : {type:String,required:true},
        nombre : {type:String,required:true},
        apellido : {type:String,required:true},
        alias : {type:String,required:true},
        edad : {type:Number,required:true},
        avatar : {type:String,required:true},
    },text : {type:String,required:true},
});

const PRODUCTOS_MODEL = mongoose.model("productos",PRODUCTOS_SCHEMA);
const MENSAJES_MODEL = mongoose.model("mensajes",MENSAJES_SCHEMA);

export default {
    PRODUCTOS_MODEL,
    MENSAJES_MODEL
};