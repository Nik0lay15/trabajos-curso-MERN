import express from "express";
import handlebars from "express-handlebars";
import router from "../routes/form.js";
import session from "express-session";
import mongoStore from "connect-mongo";
import passport from "passport";
import dotenv from "dotenv";

const APP = express();
dotenv.config({path:"../options/.env"});

APP.use(session({
    store : mongoStore.create({
        ttl:600,
        mongoUrl: "mongodb+srv://guest:guest123@tp-25.5gux6.mongodb.net/ecommerce?retryWrites=true&w=majority",
        mongoOptions: {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }
    }),
    secret:"1234",
    resave:false,
    saveUninitialized:false,
}));

APP.use(passport.initialize());
APP.use(passport.session());
APP.use(express.json());                        
APP.use(express.urlencoded({extended:true}));   
APP.use("/",router);
APP.use("/css",express.static("./node_modules/bootstrap/dist/css"));
APP.use(express.static("./public"));

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
