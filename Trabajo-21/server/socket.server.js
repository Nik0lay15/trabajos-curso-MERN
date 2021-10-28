import {IO} from "./server.js";
import {EcommerceMDB} from "../utilities/utils.js";


const Eventos = (socket) => {
    console.log("Connection stablished");
    const MONGOCONNECT = new EcommerceMDB("mongodb+srv://guest:guest123@ecommerce.1kyf8.mongodb.net/ecommerce");
        
    // Emite historial de mensajes y productos
    MONGOCONNECT.LeerMensajes((data)=>{
        IO.sockets.emit("historial",data);
    });
    MONGOCONNECT.LeerProductos( data => IO.sockets.emit("productos-listado",data));

    // Emite el producto a todos
    socket.on("productos-payload",(data)=>{
        MONGOCONNECT.GuardarProducto(data);
        MONGOCONNECT.LeerProductos( data => IO.sockets.emit("productos-listado",[data[data.length-1]]));
    });

    // Emite mensaje a todos
    socket.on("mensaje",(data)=>{
        IO.sockets.emit("publicar_mensaje",data);
        MONGOCONNECT.GuardarMensaje(data);
    });

};

export default Eventos;