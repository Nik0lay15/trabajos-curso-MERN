// Dependencias
const express = require("express")                     // Express
const routerAPI = require("./routes/api.js")           // Router API
const handlebars = require("express-handlebars")       // MVC handlebars

// Globales
const app = express();
const PUERTO = 8080;
const http = require("http").Server(app);
const io = require("socket.io")(http);

// Server
http.listen(PUERTO,()=>{
    console.log(`Listening localhost:${PUERTO}`);
});
io.on("connection",(socket)=>{
    console.log("Connection stablished");
    socket.on("cliente",(data)=>{
        console.log(data);
        io.sockets.emit("broadcast",data);
    });
});

// Midleware
app.use(express.json());                        
app.use(express.urlencoded({extended:true}));   
app.use(express.static("./public"));

// Ruteo         
app.use("/api",routerAPI);
app.use("/css",express.static("./node_modules/bootstrap/dist/css"));

// View engine
app.engine("hbs",handlebars({
        extname : ".hbs",
        defaultLayout : "base.hbs",
        layoutsDir : "./views/layouts",
        partialsDir : "./views/partials"
    }   
));
app.set("views","./views");
app.set("view engine","hbs");