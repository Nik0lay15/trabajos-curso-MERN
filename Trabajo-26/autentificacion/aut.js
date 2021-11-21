import passport from "passport";
import {Strategy as twitterStrategy} from "passport-twitter";
import models from "../options/models.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path:"./options/.env"});

mongoose.connect(process.env.MONGO_CONNECT,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const twitter = passport.use(new twitterStrategy({
        consumerKey: process.env.TWITTER_SECRETKEY,
        consumerSecret: process.env.TWITTER_APPKEY,
        callbackURL: `http://localhost:${process.env.PORT}/auth/twitter/datos`
    },(accessToken, refreshToken, profile, cb)=>{
        models.findOne({"twitterId":profile.id},(error,user)=>{
            if(error) return cb(error);
            if(user){
                return cb(null,user);
            }else{
                const nuevo_usuario = new models({
                    "twitterId":profile.id,
                    "name":profile.displayName,
                    "profile_picture":profile.photos[0].value
                });
                nuevo_usuario.save((error)=>{
                    if(error) throw(error);
                    return cb(null,nuevo_usuario);
                });
            }         
        });
        
    }));


passport.serializeUser((user,done)=>{
    return done(null,user.twitterId); 
 });
 
passport.deserializeUser((id,done)=>{
     models.findOne({"twitterId":id},(error,user)=>{
         if(error) return done(error);
         return done(null,user);
     });
 });

export default { twitter };