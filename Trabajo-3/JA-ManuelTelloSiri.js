// Funcion repetidora
const repetidorFuncion = (texto,callback,tiempo)=>{
    let texto_lista = texto.split(" ");
    let texto_pos = 0;

    const intervalo = setInterval(()=>{
        console.log(texto_lista[texto_pos]);
        texto_pos ++;
        if(texto_pos == texto_lista.length){
            clearInterval(intervalo);
            callback(texto);
        }
    },tiempo ?? 1000);
}


// Llamada de funcion 
const callback = (frase)=>{
    console.log(`Frase completa: ${frase}`);
};

const laLlamada = (texto,tiempo)=>{
    let contador = 0;
    
    repetidorFuncion(texto[0],callback,tiempo);
    contador += texto[0].split(" ").length;

    setTimeout(()=>{
        repetidorFuncion(texto[1],callback,tiempo);
        contador += texto[1].split(" ").length;
    },tiempo*texto[0].split(" ").length);
    
    setTimeout(()=>{
        repetidorFuncion(texto[2],callback,tiempo);
        contador += texto[2].split(" ").length;
    },(tiempo*texto[1].split(" ").length)*2);

    setTimeout(()=>{
        console.log(`Proceso completo, palabras totales: ${contador}`);
    },(tiempo*texto[0].split(" ").length)*3+tiempo);
}

laLlamada(["Probando probando 1","Probando probando 2","Probando probando 3"],500);
