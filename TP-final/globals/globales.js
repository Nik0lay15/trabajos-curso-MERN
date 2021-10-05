import fs from "fs";

export const path = "./data/lista-productos.txt";
export const is_admin = true;

export const readProductos = (res,callback) => {
    fs.promises.readFile(path,"utf-8")
    .then((resolve)=>{
        callback(JSON.parse(resolve));
    }).catch(error => res.status(404).json({error:"No se pudo leer la lista de productos",descripcion:error}));
};

export const writeListaProductos = (parse) => {
    fs.promises.writeFile(path,JSON.stringify(parse,null,"\t"),"utf-8");
};