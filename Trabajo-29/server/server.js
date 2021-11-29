import app from "../app/app.js";
import cluster from "cluster";
import {cpus} from "os";

const PUERTO = parseInt(process.argv[2]);
const CORES = cpus().length;
const MODO = process.argv[3];

const setUpServer = ()=>{
    const SERVER = app.listen(PUERTO,()=>{
        console.log("Server up at "+PUERTO+" pid:",process.pid);
    });
    SERVER.on("error",(error)=>{
        console.log(new Error(error));
    }); 
};

if(MODO == "CLUSTER" || MODO == "cluster"){
    if(cluster.isPrimary){
        console.log("Starting Master Cluster at pid:",process.pid);
        for(let i=0;i<CORES;i++){
            cluster.fork();
        }
    }else{
        setUpServer();
    }
}else{
    setUpServer();
}