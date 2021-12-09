import app from "../app/app.js";
import cluster from "cluster";
import {cpus} from "os";
import dotenv from "dotenv";
import logger from "../utilities/logger.js";

dotenv.config({path:"./config/.env"});
const PUERTO = process.env.PORT;
const CORES = cpus().length;
const MODO = process.argv[2];

const setUpServer = ()=>{
    const SERVER = app.listen(PUERTO,()=>{
        logger.debug("Server up at "+PUERTO+", pid:" +process.pid);
    });
    SERVER.on("error",(error)=>{
        logger.error(new Error(error));
    }); 
};

if(MODO == "CLUSTER" || MODO == "cluster"){
    if(cluster.isPrimary){
        logger.debug("Starting Master Cluster at pid:",process.pid);
        for(let i=0;i<CORES;i++){
            cluster.fork();
        }
    }else{
        setUpServer();
        cluster.worker.on("error",(error)=>{
            logger.warn("Worker died, codeId: " + error);
        });
    }
}else{
    setUpServer();
}

