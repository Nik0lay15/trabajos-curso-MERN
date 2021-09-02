import express from "express";
import fs from "fs";

let lista_productos = [];
const app = express();
const PUERTO = 3000;
const server = app.listen(PUERTO,()=>{
    console.log(`Escuchando localhost:${PUERTO}`);
})
server.on("Error:",(error)=>{
    console.log(error);
});






