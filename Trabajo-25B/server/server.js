import dotenv from "dotenv";
import app from "../app/app.js";

dotenv.config({
    path:"./config/.env"
});
const PUERTO = process.env.PORT;

const SERVER = app.listen(PUERTO,()=>{
    console.log("Server up");
});
SERVER.on("error",(error)=>{
    console.error(error);
});