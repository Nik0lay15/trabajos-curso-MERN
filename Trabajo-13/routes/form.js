const express = require("express");
const router = express.Router();

class Rutas {
    productos;
    route;

    constructor(route){
        this.productos = [];
        this.route = route;
    }

    getListado(path){
        this.route.get(path,(req,res)=>{
            res.render("lista-productos.hbs");
        });
    }
}

const rutas = new Rutas(router);
rutas.getListado("/");

module.exports = router;