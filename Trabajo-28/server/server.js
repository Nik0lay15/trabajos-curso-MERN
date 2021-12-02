import dotenv from "dotenv";
import app from "../app/app.js";
import cluster from "cluster";
import {cpus} from "os";
import {fork} from "child_process";

dotenv.config({
    path:"./config/.env"
});
const PUERTO = process.argv[2];
const CORES = cpus().length;
const MODO = process.argv[3] || "FORK";

if(MODO == "CLUSTER" || MODO == "cluster"){
    if(cluster.isPrimary){
        console.log("Starting up Master Cluster, pid:",process.pid);
        for(let i=0;i<CORES;i++){
            cluster.fork();
        }
    }else{
        const SERVER = app.listen(PUERTO,()=> {
            console.log(`Server up at port:${PUERTO} in mode ${MODO}, pid:${process.pid}`);
        });
        SERVER.on("error",(error) => {
            console.log(new Error(error));
        });
    }   
}else{
    const SERVER = fork("./utilities/serverup.js");
}