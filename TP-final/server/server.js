import app from "../app/app.js";
const PUERTO = process.env.PORT || 8080;

const server = app.listen(PUERTO,()=>{
    console.log("Listening localhost:",PUERTO);
});

server.on("error",(error)=>{
    console.log(error);
});