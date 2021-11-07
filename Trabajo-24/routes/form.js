import express from "express";
import session from "express-session";
const router = express.Router();


router.get("/",(req,res)=>{
    if(req.session.usuario == undefined){
        res.render("lista-productos.hbs");
    }else{
        res.render("lista-productos-session.hbs",{data:req.session.usuario});
    }
});

router.post("/newsession",(req,res)=>{
    console.log(req.body);
    req.session.usuario = req.body.usuario;
    res.render("lista-productos-session.hbs",{data:req.session.usuario});
});

router.get("/logout",(req,res)=>{
    req.session.destroy((error)=>{
        if(error){
            console.log(new Error(error));
        }else{
            res.redirect("/");
        }
    })
});

export default router;