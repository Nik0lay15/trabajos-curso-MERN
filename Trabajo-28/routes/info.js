import {Router} from "express";
import {cpus} from "os";

const ROUTER = Router();

ROUTER.get("/",(req,res)=>{
    let memoria = {};
    for(let [key,value] of Object.entries(process.memoryUsage())){
        memoria = {...memoria, [key]:value/1000000+" MB"};
    }
    console.log(memoria.rss);
    res.render("info",{
        argumentos  :process.argv,
        os          :process.platform,
        version     :process.version,
        memoria     :memoria.rss,
        path        :process.execPath,
        pid         :process.pid,
        root        :process.argv[1],
        cores       :cpus().length
    });
}); 

export default ROUTER;