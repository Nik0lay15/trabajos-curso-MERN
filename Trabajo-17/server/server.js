import APP from "../app/app.js";
import {CONFIG} from "../options/globals.js";
import {createServer} from "http";
import {Server} from "socket.io";
import Eventos from "./socket.server.js";

const HTTP = createServer(APP);
export const IO = new Server(HTTP);

HTTP.listen(CONFIG.port,()=>{
    console.log("Socket listening",CONFIG.port);
});

IO.on("connection",(socket)=>{
    Eventos(socket);
});
