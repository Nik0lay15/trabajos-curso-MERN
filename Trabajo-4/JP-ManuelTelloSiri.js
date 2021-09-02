// GLobales
const lista = [
    {
        nomenclatura : "Mercurio",
        abrev : "Hg",
        pos : 80,
        estado : "liquido"
    },
    {
        nomenclatura : "Litio",
        abrev : "Li",
        pos : 3,
        estado : "solido"
    },
    {
        nomenclatura : "Aluminio",
        abrev : "Al",
        pos : 13,
        estado : "solido"
    },
    {
        nomenclatura : "Plata",
        abrev : "Ag",
        pos : 47,
        estado : "solido"
    },
    {
        nomenclatura : "Uranio",
        abrev : "U",
        pos : 92,
        estado : "solido"
    }
]

// Funcion generadora
function *funcionGeneradora(){
    let numero = 0;
    while(true){
        yield numero = Math.random(25);
    }
    return numero;
}

// Promesa
const miRed1 = new Promise((resolve,reject)=>{
    const {nomenclatura,abrev,pos,estado} = lista[0];
    setTimeout(()=>{
        if(Math.random() > 0.2){
            resolve(`Todo ok\n${nomenclatura} (${abrev}) nº${pos}, estado: ${estado}`);
        }else{
            resolve("Error...");
        }
    },3000)
});
const miRed2 = new Promise((resolve,reject)=>{
    const {nomenclatura,abrev,pos,estado} = lista[1];
    setTimeout(()=>{
        if(Math.random() > 0.2){
            resolve(`Todo ok\n${nomenclatura} (${abrev}) nº${pos}, estado: ${estado}`);
        }else{
            resolve("Error...");
        }
    },2000)
});
const miRed3 = new Promise((resolve,reject)=>{
    const {nomenclatura,abrev,pos,estado} = lista[2];
    setTimeout(()=>{
        if(Math.random() > 0.2){
            resolve(`Todo ok\n${nomenclatura} (${abrev}) nº${pos}, estado: ${estado}`);
        }else{
            resolve("Error...");
        }
    },5000)
});
const miRed4 = new Promise((resolve,reject)=>{
    const {nomenclatura,abrev,pos,estado} = lista[3];
    setTimeout(()=>{
        if(Math.random() > 0.2){
            resolve(`Todo ok\n${nomenclatura} (${abrev}) nº${pos}, estado: ${estado}`);
        }else{
            resolve("Error...");
        }
    },1000)
});
const miRed5 = new Promise((resolve,reject)=>{
    const {nomenclatura,abrev,pos,estado} = lista[4];
    setTimeout(()=>{
        if(Math.random() > 0.2){
            resolve(`Todo ok\n${nomenclatura} (${abrev}) nº${pos}, estado: ${estado}`);
        }else{
            resolve("Error...");
        }
    },4000)
});

console.log("Fetching data...");
const generadora = funcionGeneradora();
for(let i=0;i<25;i++){
    console.log(generadora.next().value);
}

async function misRedes(){
    const redes = [miRed4,miRed2,miRed1,miRed5,miRed3];
    for await(const red of redes){
       console.log(`${red}\n${generadora.next().value}`);
    }
}

misRedes();
