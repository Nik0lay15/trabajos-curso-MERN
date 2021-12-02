import app from "../app/app.js";

const PUERTO = process.argv[2] || 8080;

const SERVER = app.listen(PUERTO,()=> {
    console.log(`Server up at port:${PUERTO} in mode FORK, pid:${process.pid}`);
});
SERVER.on("error",(error) => {
    console.log(new Error(error));
});