// Dependencias
import express from "express";                                 // Express
import {router as routerAPI} from "./routes/api.js";           // Ruteo API
import {router as routerFORM} from "./routes/formulario.js";   // Ruteo form

// Globales
const app = express();
const PUERTO = 8080;

// Server
const server = app.listen(PUERTO,()=>{
    console.log(`Escuchando localhost:${PUERTO}`);
})
server.on("Error:",(error)=>{
    console.log(error);
});

// Midleware
app.use(express.json());                        
app.use(express.urlencoded({extended:true})); 
// Router
app.use("/css",express.static("./node_modules/bootstrap/dist/css"));
app.use("/api",routerAPI);
app.use("/",routerFORM);
// View engine
app.set("view engine","pug");
app.set("views","./views");