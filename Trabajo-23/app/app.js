// Dependencias
import express from "express";
import handlebars from "express-handlebars";
import router from "../routes/form.js";
import session from "express-session";
const APP = express();

// Midleware
APP.use(session({
    secret:"1234",
    resave:true,
    saveUninitialized:true
}));
APP.use(express.json());                        
APP.use(express.urlencoded({extended:true}));   

// Ruteo         
APP.use("/",router);
APP.use("/css",express.static("./node_modules/bootstrap/dist/css"));
APP.use(express.static("./public"));

// View engine
APP.engine("hbs",handlebars({
        extname : ".hbs",
        defaultLayout : "base.hbs",
        layoutsDir : "./views/layouts",
        partialsDir : "./views/partials"
    }   
));
APP.set("views","./views");
APP.set("view engine","hbs");

export default APP;
