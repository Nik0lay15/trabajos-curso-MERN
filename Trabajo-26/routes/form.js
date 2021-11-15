import express from "express";
import passport from "passport";
import estrategias from "../autentificacion/aut.js";

const router = express.Router();

router.get("/",(req,res)=>{
    if(req.isAuthenticated()){  
        res.render("index.hbs",{data:req.user.username});
    }else{
        res.render("index.hbs");
    }
});
router.post("/login",passport.authenticate("twitter",{failureRedirect:"/error-log",successRedirect:"/"}));
router.get("/error-log",(req,res)=>{
    res.render("error-log.hbs");
});

router.get("/logout",(req,res)=>{
    req.logout();
    req.session.destroy();
    res.redirect("/");
});

export default router;