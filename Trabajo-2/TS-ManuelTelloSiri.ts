const Operacion = (num1:number, num2:number, texto:string):any =>{
    let salida;
    if(texto === "suma"){
        import("./suma").then(funcion => {
            salida = funcion.Suma(num1,num2);
        });
    }else{
        import("./resta").then(funcion => {
            salida =  funcion.Resta(num1,num2);
        });
    }

    return new Promise((resolve:Function,reject:Function)=>{
        setTimeout(()=>{
            console.log(salida);
        },3000);
    })
};

class Operaciones{
    #numero1:number
    #numero2:number
    #texto:string 

    constructor(numero1:number,numero2:number,texto:string){
        this.#numero1 = numero1;
        this.#numero2 = numero2;
        this.#texto = texto;
    }

    Resultado(){
        Operacion(this.#numero1,this.#numero2,this.#texto);
    }
}

const suma = new Operaciones(1,4,"suma").Resultado();
const resta = new Operaciones(5,1,"resta").Resultado();