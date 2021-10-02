// Dependencias
import { Router } from "express";
import utils from "../utilities/op-productos.js";
const router = Router();

router.get("/listar/:id?",(req,res)=>{
    utils.leerProductos((data)=>{  
        req.params.id ? res.status(200).json(data[req.params.id]) : res.status(200).json(data);
    });
});

export default router;