const http = require("http");
const PORT = process.env.port || 8000;
const objeto = {
  id: Math.floor(Math.random()*10),
  title: "Producto " + Math.floor(Math.random()*11),
  price: Math.random()*9999.99,
  thumbail: "Foto " + Math.floor(Math.random()*10)
};

const server = http.createServer((req,res)=>{
  const {id,title,price,thumbail} = objeto;
  res.end(`
    <h1>${title}</h1>
    <h4>Objeto: ${id} - $${price}</h4>
    <h4>${thumbail}</h4>
  `);
});

server.listen(PORT,()=>{
  console.log("Escuchando puerto",PORT);
  console.log(JSON.stringify(objeto));
});