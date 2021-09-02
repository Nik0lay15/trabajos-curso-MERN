// Importa dependecias
import express from "express";
import fs from "fs";
//
// Globales
const app = express();
const PUERTO = 8080;
let visitas = [0,0];
//
// Express
const server = app.listen(PUERTO,()=>{
    console.log(`Escuchando puerto ${PUERTO}`);
});
server.on("Error: ",(error)=>{
    console.log(error);
});


// Ruta items
app.get("/items",(req,res)=>{
    fs.readFile("./productos.txt",(error,data)=>{
        if(error){
            console.log(`Error al leer el archivo:\n${error}`);
        }else{
            const lista_productos = JSON.parse(data);
            console.log({items:lista_productos,cantidad:lista_productos.length});
            visitas[0] ++;
            res.json(lista_productos);
        }
    });
});

// Ruta random-item
app.get("/item-random",(req,res)=>{
    fs.readFile("./productos.txt",(error,data)=>{
        const lista_productos = JSON.parse(data);
        const item_random = lista_productos[Math.floor(Math.random()*lista_productos.length)];
        console.log({item:item_random});
        visitas[1]++;
        res.json(item_random);
    });
});

// Ruta visitas
app.get("/visitas",(req,res)=>{
    console.log({visitas:{items:visitas[0],item:visitas[1]}})
    res.json({
        visitas:{
            items:visitas[0],
            item:visitas[1]
        }
    });
});