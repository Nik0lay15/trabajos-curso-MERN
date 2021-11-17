import APP from "../app/app.js";
import {CONFIG} from "../options/globals.js";

const puerto = process.argv[2] || CONFIG.port;

const server = APP.listen(puerto,()=>{
    console.log("Server up",puerto);
});

server.on("exit",(codigo)=>{
    console.log("Saliendo del proceso, codigo",codigo);
});
