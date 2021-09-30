"use strict";

// Funciones
var miGuardado = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
        var time_info, mail, mensaje;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // Guarda historial
                        time_info = data.time_info, mail = data.mail, mensaje = data.mensaje;

                        fs.promises.readFile(__dirname + "/public/mensajes.txt", "utf-8").then(function (resolve) {
                            var lista = JSON.parse(resolve);
                            lista.push({ mail: mail, time_info: time_info, mensaje: mensaje });
                            fs.promises.writeFile(__dirname + "/public/mensajes.txt", JSON.stringify(lista, null, "\t"));
                        }).catch(function (error) {
                            return console.log(error);
                        });

                    case 2:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function miGuardado(_x) {
        return _ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Dependencias
var express = require("express"); // Express
var router = require(__dirname + "/routes/form.js"); // Router INDEX
var handlebars = require("express-handlebars"); // MVC handlebars
var fs = require("fs");

// Globales
var app = express();
var PUERTO = process.env.PORT || 8080;
var http = require("http").Server(app);
var io = require("socket.io")(http);
var mensajes = [];
function leerHistorial(socket) {
    fs.readFile(__dirname + "/public/mensajes.txt", function (error, data) {
        if (error) {
            console.log(error);
        } else {
            var historial = JSON.parse(data);
            socket.emit("historial", historial);
        }
    });
}

// Server
http.listen(PUERTO, function () {
    console.log("Listening localhost:" + PUERTO);
});
io.on("connection", function (socket) {
    console.log("Connection stablished");
    leerHistorial(socket);

    // Mensajes del cliente
    socket.on("productos-payload", function (data) {
        console.log(data);
        io.sockets.emit("productos", data);
    });
    socket.on("mensaje", function (data) {
        io.sockets.emit("publicar_mensaje", data);
        miGuardado(data);
    });
});

// Midleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruteo         
app.use("/", router);
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