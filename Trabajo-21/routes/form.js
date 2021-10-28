import express from "express";
const router = express.Router();

router.get("/",(req,res)=>{
    res.render("lista-productos.hbs");
});

export default router;