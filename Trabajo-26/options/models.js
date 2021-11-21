import mongoose from "mongoose";

const USER_TWITTER_SCHEMA = new mongoose.Schema({
    twitterId : {type:String,required:true},
    name : {type:String,required:true},
    profile_picture : {type:String,required:true}
});

const TWITTER_MODEL = mongoose.model("twitter_accounts",USER_TWITTER_SCHEMA);

export default TWITTER_MODEL;
