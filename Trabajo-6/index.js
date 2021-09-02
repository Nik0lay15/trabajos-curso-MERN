import fs from "fs";

class Archivo {
    archivo;

    constructor(archivo){
        this.archivo = archivo;
    }

    async leer(){
        fs.promises.readFile(`./${this.archivo}`,"utf-8")
        .then(resolve =>{
            console.log(JSON.parse(resolve));
        })
        .catch(error =>{
            console.log([]);
        })
            
    }

    async guardar(nuevo_e){
        fs.promises.readFile(`./${this.archivo}`,"utf-8")
        .then((resolve)=>{
            // Edit: handle para ver si el archivo esta vacio o ya
            // hay productos dentro del array
            if(resolve == " " || resolve == ""){
                const nuevo_producto = [{...nuevo_e, id : 1}];
                const guardado = JSON.stringify(nuevo_producto,null,"\t");
                fs.promises.writeFile(`./${this.archivo}`,guardado); 
            }else{
                let texto = JSON.parse(resolve);
                texto.push({...nuevo_e, id :texto.length+1});
                let guardado = JSON.stringify(texto,null,"\t");
                fs.promises.writeFile(`./${this.archivo}`,guardado);
            }
            console.log("Guardado completado");
        })
        .catch(error => {
            console.log("Error al guardar\n",error);
        });

    }

    borrar(){
        fs.unlink(`./${this.archivo}`,(error)=>{
            if(error) console.log(`El archivo no se pudo borrar\n${error}`);
        });
    }
}

const archivo = new Archivo("productos.txt");
//archivo.leer();
archivo.guardar({title: "hojas",price : 120,thumbail : "thumbail1.jpg"});
//archivo.guardar({title: 'lapicera', price: 50, thumbail: 'thumbnail2.jpg'})
//archivo.guardar({title: 'goma', price: 30, thumbail: 'thumbnail3.jpg'})
//archivo.borrar();