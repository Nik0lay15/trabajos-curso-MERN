import app from "../app/app.js";
import cluster from "cluster";
import {cpus} from "os";
import logger from "../utilities/logger.js";

const PUERTO = parseInt(process.argv[2]);
const CORES = cpus().length;
const MODO = process.argv[3];

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
}

