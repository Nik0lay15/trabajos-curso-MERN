import APP from "../app/app.js";
import {CONFIG,SQLITE_CONFIG} from "../globals/globals.js";
import {createServer} from "http";
import {Server} from "socket.io";
import knex from "knex";

const HTTP = createServer(APP);
export const IO = new Server(HTTP);
export const KNEX_APP = knex(SQLITE_CONFIG);

HTTP.listen(CONFIG.port,()=>{
    console.log("Socket listening",CONFIG.port);
});

IO.on("connection",(socket)=>{
    console.log("Connection stablished");

    // Mensajes del cliente
    socket.on("productos-payload",(data)=>{
        console.log(data);
        IO.sockets.emit("productos",data);
    });
    socket.on("mensaje",(data)=>{
        IO.sockets.emit("publicar_mensaje",data);
    });
});
