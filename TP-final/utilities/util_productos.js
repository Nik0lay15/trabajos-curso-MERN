//--> Dependencias
import fs from "fs";
import { Producto } from "./classes.js";
import { is_admin,readProductos,writeListaProductos } from "../globals/globales.js";

//--> Methods
const getProductos = (req,res) => {
  readProductos(res,(data)=>{
    const id = req.params.id;
    if(id != undefined){
        const busqueda = data.find(e => e.id == id);
        busqueda != undefined ? res.status(200).json(busqueda) : res.status(404).json({info:"Producto no encontrado",descripcion:`ID: ${id}`});
    }else{
      return res.status(200).json(data);
    }
  });
};

const postProducto = (req,res,next) => {
  if(is_admin == false)
    next({route:"localhost:8080/productos",method:req.method});
  
  const {nombre,descripcion,url,precio,stock} = req.body;
  readProductos(res,(data)=>{
    const producto_nuevo = new Producto(nombre,descripcion,url,precio,stock);
    const nueva_lista = [...data,producto_nuevo.getProductoElementos()];
    writeListaProductos(nueva_lista);
    return res.status(200).json({info:"Producto creado",descripcion:producto_nuevo.getProductoElementos()});
  });
};

const patchProducto = (req,res,next) => {
  if(is_admin == false)
    next({route:"localhost:8080/productos",method:req.method});

  readProductos(res,(data)=>{
    const {id,timestamp,nombre,descripcion,codigo,url,precio,stock} = req.body;
    const p_id = req.params.id;
    try{
      let productos = data;
      (productos[p_id].id = id != undefined ? id : productos[p_id].id),
      (productos[p_id].timestamp = timestamp != undefined ? timestamp : productos[p_id].timestamp),
      (productos[p_id].nombre = nombre != undefined ? nombre : productos[p_id].nombre),
      (productos[p_id].descripcion = descripcion != descripcion ? descripcion : productos[p_id].descripcion),
      (productos[p_id].codigo = codigo != undefined ? codigo : productos[p_id].codigo),
      (productos[p_id].url = url != undefined ? url : productos[p_id].url),
      (productos[p_id].precio = precio != undefined ? precio : productos[p_id].precio),
      (productos[p_id].stock = stock != undefined ? stock : productos[p_id].stock);
      writeListaProductos(productos);
      return res.status(200).json({info:"Producto actualizado",descripcion:productos[p_id]});
    }catch(error){
      return res.status(404).json({info:"Producto no encontrado",descripcion:`ID: ${p_id}`});
    }
  });
};

const putProducto = (req,res,next) => {
  if(is_admin == false)
    next({route:"localhost:8080/productos",method:req.method});

  readProductos(res,(data)=>{
    const {id,timestamp,nombre,descripcion,codigo,url,precio,stock} = req.body;
    const p_id = req.params.id;
    try{
      let productos = data;
      (productos[p_id].id = id),
      (productos[p_id].timestamp = timestamp),
      (productos[p_id].nombre = nombre),
      (productos[p_id].descripcion = descripcion),
      (productos[p_id].codigo = codigo),
      (productos[p_id].url = url),
      (productos[p_id].precio = precio),
      (productos[p_id].stock = stock);
      writeListaProductos(productos);
      return res.status(200).json({info:"Producto actualizado",descripcion:productos[p_id]});
    }catch(error){
      return res.status(404).json({info:"Producto no encontrado",descripcion:`ID: ${p_id}`});
    }
  });
};

const deleteProducto = (req,res,next) => {
  if(is_admin == false)
    next({route:"localhost:8080/productos",method:req.method});
  
  const id = req.params.id;
  readProductos(res,(data)=>{
    try{
      const nueva_lista = data.filter(e => e.id != id);
      const producto_borrado = data.find(e => e.id == id);
      writeListaProductos(nueva_lista);
      return res.status(200).json({info:"Producto eliminado",descripcion:producto_borrado});
    }catch(error){
      return res.status(404).json({info:"Producto no encontrado",descripcion:`ID: ${id}`});
    }
  });
};

export default {
  getProductos,
  postProducto,
  patchProducto,
  putProducto,
  deleteProducto
};