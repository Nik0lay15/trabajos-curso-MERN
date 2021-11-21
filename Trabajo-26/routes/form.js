import express from "express";
import passport from "passport";
import estrategias from "../autentificacion/aut.js";

const router = express.Router();

router.get("/",(req,res)=>{
    res.render("index");
});

router.get("/auth/twitter",passport.authenticate("twitter"));
router.get("/auth/twitter/datos",passport.authenticate("twitter",{failureRedirect:"/error-log"}),(req,res)=>{
    if(req.isAuthenticated()){
        const {twitterId,name,profile_picture} = req.user;
        res.render("datos",{twitterId,name,profile_picture});
    }else{
        res.redirect("/");
    }
});

router.get("/logout",(req,res)=>{
    req.logOut();
    req.session.destroy();
    console.log("Login out");
    res.redirect("/");
});

router.get("/error-log",(req,res)=>{
    res.render("error-log");
});

export default router;