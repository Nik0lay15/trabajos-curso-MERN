import express from "express";
import passport from "passport";
import estrategias from "../autentificacion/aut.js";

const router = express.Router();

router.get("/",(req,res)=>{
    if(req.isAuthenticated()){
        const {name, mail, profile_picture} = req.user;  
        res.render("index.hbs",{name,mail,profile_picture});
    }else{
        res.render("index.hbs");
    }
});
router.get("/login",passport.authenticate("twitter",{failureRedirect:"/error-log",successRedirect:"/"}));
router.get("/error-log",(req,res)=>{
    res.render("error-log.hbs");
});

router.get("/logout",(req,res)=>{
    req.logout();
    req.session.destroy();
    res.redirect("/");
});

export default router;