// Dependencias
import express from "express";                  // Express
import router from "./routes/api.js";           // Ruteo
import handlebars from "express-handlebars";    // MVC handlebars

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
app.use("/css",express.static("./node_modules/bootstrap/dist/css"));
app.set("view engine","pug");
app.set("views","./views");


