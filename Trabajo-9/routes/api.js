import express from "express";
const router = express.Router();

let lista_productos = [];

//// Ruta productos
router.get("/productos/listar",(req,res)=>{    
    if(lista_productos == 0){
        res.status(404).json({error:"No hay productos cargados."});
    }else{
        res.status(200).json(lista_productos);
    }
});
// " por ID
router.get("/productos/listar/:id",(req,res)=>{
    const busqueda = lista_productos.find(elemento => elemento.id == req.params.id);
    if(busqueda === undefined){
        res.status(404).json({error:"Producto no encontrado."});
    }else{
        res.status(200).json(busqueda);
    }
});

//// Ruta incorpora producto
router.post("/productos/guardar/",(req,res)=>{
    const nuevo_producto = {...req.body,id:lista_productos.length};
    lista_productos.push(nuevo_producto);
    res.status(200).json(nuevo_producto);
});

//// Ruta actualiza producto
router.put("/productos/actualizar/:id",(req,res)=>{
    const producto_busqueda = lista_productos.find(elemento => elemento.id == req.params.id);
    if(producto_busqueda === undefined){
        res.status(404).json({error:"Producto no encontrado."});
    }else{
        res.status(200).json(producto_busqueda);
    }
});

//// Ruta elminina producto
router.delete("/productos/borrar/:id",(req,res)=>{
    const id_eliminar = lista_productos.findIndex((elemento)=> elemento.id == req.params.id);
    if(id_eliminar == -1){
        res.status(404).json({error:"Producto no encontrado."});
    }else{
        res.status(200).json({info:"Producto eliminado.",data:lista_productos[id_eliminar]});
    }
});


export default router;