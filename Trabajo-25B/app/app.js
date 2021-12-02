import express from "express";
import handlebars from "express-handlebars";
import Joiner from "../utilities/paths.js";

const APP = express();

APP.use(express.json());
APP.use(express.urlencoded({extended:true}));
APP.use("/css",express.static(Joiner("/node_modules/bootstrap/dist/css")));

APP.engine("hbs",handlebars.engine({
    layoutsDir:Joiner("/views/layouts"),
    defaultLayout:"base.hbs",
    extname:".hbs"
}));
APP.set("view engine","hbs");
APP.set("views",Joiner("/views"));

export default APP;