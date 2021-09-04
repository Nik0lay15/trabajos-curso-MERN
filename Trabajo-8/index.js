import express from "express";

let lista_productos = [];
const app = express();
const PUERTO = 3000;
const server = app.listen(PUERTO,()=>{
    console.log(`Escuchando localhost:${PUERTO}`);
})
server.on("Error:",(error)=>{
    console.log(error);
});

//// Ruta productos
app.get("/api/productos/listar",(req,res)=>{    

});
// " por ID
app.get("/api/productos/listar/:id",(req,res)=>{
    const parametro =  req.params;
    console.log(`Nuevo request a ${req.path}:\n${lista_productos[parametro.id]}`);
    res.json(lista_productos[parametro.id]);
});

//// Ruta incorpora producto
app.post("/api/productos/guardar",(req,res)=>{

});