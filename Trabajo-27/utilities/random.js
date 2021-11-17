const sumaRepetidos = (lista,numero) => {
    let rep;
    for(let item in lista){
        if(item == numero){
            rep++;
        } 
    }
    return rep;
};

const numerosRandom = (cant)=>{
    let lista_numeros = [];
    let lista_objetos = {};
    for(let i=0;i<cant;i++){
        lista_numeros.push(Math.floor(Math.random()*1000));
    }
    for(let item in lista_numeros){
        lista_objetos = {...lista_objetos,[item]:sumaRepetidos(lista_numeros,item)};
    }
    return (lista_objetos);
};
3
process.on("message",(mensaje)=>{
    const numeros = numerosRandom(mensaje)
    process.send(numeros);
});
