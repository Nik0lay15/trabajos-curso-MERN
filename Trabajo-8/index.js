// Dependencias
import express from "express";

// Globales
let lista_productos = [];
const app = express();
const PUERTO = 8080;
const server = app.listen(PUERTO,()=>{
    console.log(`Escuchando localhost:${PUERTO}`);
})
server.on("Error:",(error)=>{
    console.log(error);
});

// Midleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//// Ruta productos
app.get("/api/productos/listar",(req,res)=>{    
    if(lista_productos == 0){
        res.status(404).json({error:"No hay productos cargados."});
    }else{
        res.json(lista_productos);
    }
});
// " por ID
app.get("/api/productos/listar/:id",(req,res)=>{
    const busqueda = lista_productos.find(elemento => elemento.id == req.params.id);
    if(busqueda === undefined){
        res.status(404).json({error:"Producto no encontrado."});
    }else{
        res.json(busqueda);
    }
});

//// Ruta incorpora producto
app.post("/api/productos/guardar/",(req,res)=>{
    const nuevo_producto = {...req.body,id:lista_productos.length};
    lista_productos.push(nuevo_producto);
    res.json(nuevo_producto);
});