import express from "express";
import faker from "faker";
const router = express.Router();

router.get("/",(req,res)=>{
    const lista_productos = [];

    if(req.query != undefined){
        if(req.query.cant == 0){
            lista_productos.push({info:"No hay productos"});
        }else{
            for(let i=0;i<req.query.cant;i++){
                lista_productos.push({
                    id : faker.datatype.uuid(),
                    title : faker.commerce.product(),
                    price : faker.commerce.price(),
                    thumbail : faker.image.image()
                });
            }
        }
        res.status(200).json(lista_productos);
    }
});

export default router;