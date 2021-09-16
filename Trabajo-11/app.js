// Dependencias
import express from "express";                               // Express
import {router as routerAPI} from "./routes/api.js";         // API router
import {router as routerFORM} from "./routes/form.js"        // FORM router          

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
app.use(express.static("./public"));  
// Router              
app.use("/",routerFORM);
app.use("/api",routerAPI);
app.use("/css",express.static("./node_modules/bootstrap/dist/css"));
// View engine
app.set("view engine","ejs");


