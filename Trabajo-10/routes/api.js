import express from "express";
const router = express.Router();

class Rutas {
    productos;
    route;

    constructor(route){
        this.productos = [];
        this.route = route;
    }

    getProductos(path){
        // Ruta listar productos
        this.route.get(path,(req,res)=>{
            if(this.productos == 0){
                res.status(404).json({error:"No hay productos cargados."});
            }else{
                res.status(200).json(this.productos);
            }
        });
    }

    getById(path){
        // " lista por ID
        this.route.get(path,(req,res)=>{
            const busqueda = this.productos.find(elemento => elemento.id == req.params.id);
            if(busqueda === undefined){
                res.status(404).json({error:"Producto no encontrado."});
            }else{
                res.status(200).json(busqueda);
            }
        });
    }

    postProducto(path){
        // " agrega un producto
        this.route.post(path,(req,res)=>{
            const nuevo_producto = {...req.body,id:this.productos.length};
            this.productos.push(nuevo_producto);
            //res.status(200).json(nuevo_producto);
            res.status(301).redirect("/api/productos/vista");
        });
    }

    putActualizar(path){
        // " actualiza un elemento de los productos
        this.route.put(path,(req,res)=>{
            const id = req.params.id;
            try{
                // Creo que esta parte la hice medio redundante
                const {title,price,thumbail} = req.body;
                this.productos[id] = {...this.productos[id],
                    title : (title === undefined) ?  this.productos[id].title : title,
                    price : (price === undefined) ? this.productos[id].price : price,
                    thumbail : (thumbail === undefined) ? this.productos[id].thumbail : thumbail
                };
                res.status(200).json({info:"Producto actualizado",data:this.productos[id]});
            }catch(error){
                console.log("Error: ",error);
                res.status(404).json({info:"Producto no encontrado"});
            }
        });
    }

    deleteProducto(path){
        // " elimina producto
        this.route.delete(path,(req,res)=>{
            const id_eliminar = this.productos.find(elemento => elemento.id == req.params.id);
            if(id_eliminar === undefined){
                res.status(404).json({error:"Producto no encontrado."});
            }else{
                this.productos = this.productos.filter((elemento) => elemento.id != req.params.id);
                res.status(200).json({info:"Producto eliminado",data:id_eliminar});
            }
        });
    }

    getMVCProductos(path){
        // Muestra los productos en plantilla

        this.route.get(path,(req,res)=>{
            const lista = this.productos.length>0 ? true : false;
            try{    
                res.render("lista-productos.hbs",{productos:this.productos,lista});
            }catch(error){
                console.log(error);
            }
        });
    }
}

const rutas = new Rutas(router);

rutas.getProductos("/productos/listar");
rutas.getById("/productos/listar/:id");
rutas.postProducto("/productos/guardar/");
rutas.putActualizar("/productos/actualizar/:id");
rutas.deleteProducto("/productos/borrar/:id");
rutas.getMVCProductos("/productos/vista");

export default router;