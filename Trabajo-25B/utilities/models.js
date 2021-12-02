import mongoose from "mongoose";

const USER_SCHEMA = new mongoose.Schema({
    username : {type:String,required:true},
    password : {type:String,required:true}
});

const USER_MODEL = mongoose.model("users",USER_SCHEMA);

export default USER_MODEL;