import passport from "passport";
import {Strategy as localStrategy} from "passport-local";
import mongoose from "mongoose";
import dotenv from "dotenv";
import models from "../utilities/models.js";

dotenv.config({
    path:"./config"
});
mongoose.connect(process.env.MONGO_CONNECT,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const strat_sign = passport.use("registrarse",new localStrategy((username,password,done)=>{
    models.USER_MODEL.findOne({"username":username},(error,user)=>{
        if(error) return done(error);
        if(user){
            return done(null,false,console.log("Username ya utilizado"));
        }else{
            const nuevo_usuario = new models.USER_MODEL({"username":username,"password":password});
            console.log(nuevo_usuario);
            nuevo_usuario.save((error)=>{
                if(error) throw(error);
                return done(null,nuevo_usuario);
            });
        }
    })
}));

const strat_log = passport.use("loguearse",new localStrategy((username,password,done)=>{
    models.USER_MODEL.findOne({"username":username},(error,user)=>{
        if(error) return done(error);
        if(!user){
            return done(null,false,console.log("Usuario no existe"));
        }else{
            if(user.password == password){
                return done(null,user);
            }else{
                return done(null,false,console.log("Contraseña incorrecta"));
            }
        }
    });
}));

passport.serializeUser((user,done)=>{
    return done(null,user._id); 
 });
 
passport.deserializeUser((id,done)=>{
     models.USER_MODEL.findById(id,(error,user)=>{
         if(error) return done(error);
         return done(null,user);
     });
 });

export default { strat_sign, strat_log };