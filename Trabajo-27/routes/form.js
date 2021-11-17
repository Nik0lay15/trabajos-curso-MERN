import express from "express";
import passport from "passport";
import {fork} from "child_process";

const router = express.Router();


router.get("/info",(req,res)=>{
    let memoria = {};
    for(let [key,value] of Object.entries(process.memoryUsage())){
        memoria = {...memoria, [key]:value/1000000+" MB"};
    }
    console.log(memoria.rss);
    res.render("datos",{
        argumentos  :process.argv,
        os          :process.platform,
        version     :process.version,
        memoria     :memoria.rss,
        path        :process.execPath,
        pid         :process.pid,
        root        :process.argv[1]
    });
});

router.get("/randoms",(req,res)=>{
    const cantidad = parseInt(req.query.cant) || 100000000;
    const calculo = fork("./utilities/random.js");
    calculo.send(cantidad);
    calculo.on("message",(resultado)=>{
        console.log(resultado);
        res.render("calculo",{numeros:resultado});
    });
});

export default router;