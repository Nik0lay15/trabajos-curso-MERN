// Dependencias
const express = require("express")                     // Express
const router = require(__dirname + "/routes/form.js")  // Router INDEX
const handlebars = require("express-handlebars")       // MVC handlebars
const fs = require("fs");

// Globales
const app = express();
const PUERTO = 8080;
const http = require("http").Server(app);
const io = require("socket.io")(http);
async function miGuardado(data){
    const {time_info,mail,mensaje} = data;
    fs.promises.readFile(__dirname + "/public/mensajes.txt","utf-8")
    .then((resolve)=>{
        const lista = JSON.parse(resolve);
        lista.push({mail,time_info,mensaje});
        fs.promises.writeFile(__dirname + "/public/mensajes.txt",JSON.stringify(lista,null,"\t"))
    })
    .catch(error => console.log(error));
}

// Server
http.listen(PUERTO,()=>{
    console.log(`Listening localhost:${PUERTO}`);
});
io.on("connection",(socket)=>{
    console.log("Connection stablished");
    socket.on("productos-payload",(data)=>{
        console.log(data);
        io.sockets.emit("productos",data);
    });
    socket.on("mensaje",(data)=>{
        io.sockets.emit("publicar_mensaje",data);
        miGuardado(data);
    });
});

// Midleware
app.use(express.json());                        
app.use(express.urlencoded({extended:true}));   

// Ruteo         
app.use("/",router);
app.use("/css",express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use(express.static(__dirname + "/public"));

// View engine
app.engine("hbs",handlebars({
        extname : ".hbs",
        defaultLayout : "base.hbs",
        layoutsDir : "./views/layouts",
        partialsDir : "./views/partials"
    }   
));
app.set("views",__dirname + "/views");
app.set("view engine","hbs");