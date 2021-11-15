import passport from "passport";
import {Strategy as twitterStrategy} from "passport-twitter";
import models from "../options/models.js";
import mongoose from "mongoose";


mongoose.connect("mongodb+srv://guest:guest123@tp-25.5gux6.mongodb.net/ecommerce?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const twitter = passport.use(new twitterStrategy({
        consumerKey: process.env.TWITTER_KEY,
        consumerSecret: process.env.TWITTER_SECRET,
        callbackURL: `http://localhost:${process.env.PORT}`
    },(accessToken, refreshToken, profile, cb)=>{
        models.USER_MODEL.findOne({"twitterId":profile.id},(error,user)=>{
            if(error) return cb(error);
            console.log(profile);
            const nuevo_usuario = new models.TWITTER_MODEL({
                "twitterId":profile.id,
                "name":profile.displayName,
                "mail":profile.emails[0].value,
                "profile_picture":profile.photos[0].value
            });
            nuevo_usuario.save((error)=>{
                if(error) throw(error);
                return cb(null,nuevo_usuario);
            });
        });
    }));


passport.serializeUser((user,done)=>{
    return done(null,user.twitterId); 
 });
 
passport.deserializeUser((id,done)=>{
     models.USER_MODEL.findOne({"twitterId":id},(error,user)=>{
         if(error) return done(error);
         return done(null,user);
     });
 });

export default { twitter };