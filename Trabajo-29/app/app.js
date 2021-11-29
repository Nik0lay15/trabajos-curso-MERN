import express from "express";
import handlebars from "express-handlebars";
import Rutas from "../routes/rutas.js";

const APP = express();

APP.use(express.json());                        
APP.use(express.urlencoded({extended:true}));   
APP.use("/",Rutas);
APP.use("/css",express.static("./node_modules/bootstrap/dist/css"));

APP.engine("hbs",handlebars.engine({
        extname : ".hbs",
        defaultLayout : "base.hbs",
        layoutsDir : "./views/layouts",
        partialsDir : "./views/partials"
    }   
));
APP.set("views","./views");
APP.set("view engine","hbs");

export default APP;
