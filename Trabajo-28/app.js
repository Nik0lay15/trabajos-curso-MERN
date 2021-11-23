import express from "express";
import cluster from "cluster";
import { fork } from "child_process";
import os from "os";

const app = express();

const puerto = process.argv[2] || 8080;
const protype = process.argv[3];

if(protype == "cluster" || protype == "CLUSTER"){
    if(cluster.isPrimary){
        console.log("Master process started on pid",process.pid);
        for(let i =0;i<6;i++){
            cluster.fork();
        } 
    }else{
        app.listen(puerto,()=>console.log(`Server up on ${puerto}, pid ${process.pid}`));
    }
}else{
    const child = fork("./server.js");
}

