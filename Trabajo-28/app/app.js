import express from "express";
import handlebars from "express-handlebars";
import InfoRoute from "../routes/info.js";
import Joiner from "../utilities/path.js";

const APP = express();

APP.use(express.json());
APP.use(express.urlencoded({extended:true}));
APP.use("/css",express.static(Joiner("/node_modules/bootstrap/dist/css")));

APP.use("/info",InfoRoute);

APP.engine("hbs",handlebars.engine({
    extname:".hbs",
    layoutDir:Joiner("/views/layouts"),
    defaultLayout:"base.hbs"
}));
APP.set("view engine","hbs");
APP.set("views",Joiner("/views"));

export default APP;
