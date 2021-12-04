import express from "express";
import handlebars from "express-handlebars";
import InfoRoute from "../routes/rutas.js";
import RandomRoute from "../routes/random.js";
import compression from "compression";

const APP = express();

APP.use(express.json());                        
APP.use(express.urlencoded({extended:true}));   
APP.use("/css",express.static("./node_modules/bootstrap/dist/css"));

APP.use("/info",InfoRoute);
APP.use("/info-comp",compression({threshold:0}),InfoRoute);
APP.use("/randoms",RandomRoute);

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
