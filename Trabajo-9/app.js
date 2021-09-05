// Dependencias
import express from "express";         // Express
import router from "./routes/api.js";  // Ruteo

// Globales
const app = express();
const PUERTO = 8080;
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
app.use("/api",router);


