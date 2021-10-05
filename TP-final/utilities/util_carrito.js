//--> Dependencias
import { Carrito, Producto } from "./classes.js";
import { readProductos } from "../globals/globales.js";
const carrito = new Carrito();

//--> Methods
const getProductosFromCarrito = (req,res,next) => {
    readProductos(res,(data)=>{
        const carrito_lista_productos = [];
        for(let item of carrito.getProductos()){
            const resultado = data.find(e => e.id == item)
            resultado == undefined ? null : carrito_lista_productos.push(resultado);
        }
        return res.status(200).json({info:`Productos del carrito ${carrito.getId()}`,descripcion:carrito_lista_productos});
    });
};

const postProductoToCarrito = (req,res,next) => {
    readProductos(res,(data)=>{
        const busqueda = data.find(e => e.id == req.body.id);
        if(busqueda == undefined){
            return res.status(404).json({error:"Producto no encontrado",descripcion:`ID: ${req.body.id}`});
        }else{
            carrito.setListaProductos([...carrito.getProductos(),busqueda.id]);
            return res.status(200).json({info:"Producto agregado",descripcion:busqueda});
        }
    });
};

const deleteProductoFromCarrito = (req,res,next) => {
    readProductos(res,(data)=>{
        for(const item of carrito.getProductos()){
            const busqueda = data.find(e => e.id == item); 
            if(busqueda == undefined){
                return res.status(404).json({error:"Producto no encontrado",descripcion:`ID: ${req.params.id}`});
            }else{
                const nueva_lista_productos = carrito.getProductos().filter(e => e != busqueda.id);
                carrito.setListaProductos(nueva_lista_productos);
                return res.status(200).json({info:"Producto eliminado",descripcion:busqueda.id});  
            }
        }
    });
};

export default {
    getProductosFromCarrito,
    postProductoToCarrito,
    deleteProductoFromCarrito
};