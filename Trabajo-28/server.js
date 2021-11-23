import express from "express";

const app = express();
const puerto = process.argv[2] || 8080;

app.listen(puerto,()=>console.log(`Server up on fork mode ${puerto}, pid ${process.pid}`));
