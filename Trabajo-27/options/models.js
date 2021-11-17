import mongoose from "mongoose";

const PRODUCTOS_SCHEMA = new mongoose.Schema({
    p_id : {type:String, required:true},
    price : {type:Number,required:true},
    title : {type:String,required:true},
    thumbail : {type:String,required:true}
});  

const MENSAJES_SCHEMA = new mongoose.Schema({
    time_info: {type:String, required:true},
    mail : {type:String, required:true},
    mensaje : {type:String, required:true}
});

const USER_SCHEMA = new mongoose.Schema({
    username : {type:String,required:true},
    password : {type:String,required:true}
});

const USER_TWITTER_SCHEMA = new mongoose.Schema({
    twitterId : {type:String,required:true},
    name : {type:String,required:true},
    mail : {type:String,required:true},
    profile_picture : {type:String,required:true}
});

const PRODUCTOS_MODEL = mongoose.model("productos",PRODUCTOS_SCHEMA);
const MENSAJES_MODEL = mongoose.model("mensajes",MENSAJES_SCHEMA);
const USER_MODEL = mongoose.model("users",USER_SCHEMA);
const TWITTER_MODEL = mongoose.model("twitter_account",USER_TWITTER_SCHEMA);

export default {
    PRODUCTOS_MODEL,
    MENSAJES_MODEL,
    USER_MODEL,
    TWITTER_MODEL
};