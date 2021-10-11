import {IO} from "./server.js";
import { HistorialDB, ProductosDB} from "../utilities/utils.js";

const Eventos = (socket) => {
    console.log("Connection stablished");

    // Emite historial de mensajes
    HistorialDB.leerHistorial(data => IO.sockets.emit("historial",data));
    ProductosDB.leerProductos((data) => {
        IO.sockets.emit("productos-listado",data)
    });
    
    // Emite el producto a todos
    socket.on("productos-payload",(data)=>{
        ProductosDB.guardarProductos(data);
        ProductosDB.leerProductos((data)=>{
            IO.sockets.emit("productos-listado",[data[data.length-1]]);
        });
    });

    // Emite mensaje a todos
    socket.on("mensaje",(data)=>{
        IO.sockets.emit("publicar_mensaje",data);
        HistorialDB.guardarAlHistorial(data);
    });
};

export default Eventos;