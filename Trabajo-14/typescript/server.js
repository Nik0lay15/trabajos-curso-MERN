"use strict";
// Dependencias
const express = require("express");
const fs = require("fs");
const handlebars = require("express-handlebars");
// Globales
const PUERTO = process.env.PORT || 8080;
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const mensajes = [];
// Funciones 
const miGuardado = (data) => {
    // Guarda historial
    const { time_info, mail, mensaje } = data;
    fs.promises.readFile(__dirname + "/public/mensajes.txt", "utf-8")
        .then((resolve) => {
        const lista = JSON.parse(resolve);
        lista.push({ mail, time_info, mensaje });
        fs.promises.writeFile(__dirname + "/public/mensajes.txt", JSON.stringify(lista, null, "\t"));
    })
        .catch((error) => {
        console.log(error);
    });
};
function leerHistorial(socket) {
    fs.readFile(__dirname + "/public/mensajes.txt", (error, data) => {
        if (error) {
            console.log(error);
        }
        else {
            const historial = JSON.parse(data);
            socket.emit("historial", historial);
        }
    });
}
// Server 
http.listen(PUERTO, () => {
    console.log("Escuchando localhost:", PUERTO);
});
io.on("connection", (socket) => {
    console.log("Conexion establecida");
    // Mensajes del cliente
    socket.on("productos-payload", (data) => {
        console.log(data);
        io.sockets.emit("productos", data);
    });
    socket.on("mensaje", (data) => {
        io.sockets.emit("publicar_mensaje", data);
        miGuardado(data);
    });
});
// Midleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Ruteo
//app.use("/",router);
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use(express.static(__dirname + "/public"));
// View engine
app.engine("hbs", handlebars({
    extname: ".hbs",
    defaultLayout: "base.hbs",
    layoutsDir: "./views/layouts",
    partialsDir: "./views/partials"
}));
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
