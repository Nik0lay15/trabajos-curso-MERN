//--> Dependencias
import express  from "express";
import router_carrito from "../routes/carrito.js";
import router_productos from "../routes/productos.js";
const app = express();

//--> Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./public"));
app.use("/css",express.static("./node_modules/bootstrap/dist/css"));

//--> Rutas
app.use("/carrito",router_carrito);
app.use("/productos",router_productos);

export default app;