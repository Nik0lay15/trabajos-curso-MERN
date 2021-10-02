//--> Dependencias
import fs from "fs";

//--> Variables
const lista_productos = [];

//--> Funciones
const leerProductos = (callback) => {
    fs.promises.readFile("./data/lista-productos.txt","utf-8").
    then((resolve)=>{
      const parse = JSON.parse(resolve);
      callback(parse);
    }).catch((error) => console.log(error));
};

export default {
    leerProductos,
};