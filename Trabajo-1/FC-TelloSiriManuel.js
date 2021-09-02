// Funcion constructora
function Usuario(nombre,apellido,libros,mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
}

// Metodos 
Usuario.prototype.getFullname = function () {
    return `${this.nombre} ${this.apellido}`;
};

Usuario.prototype.addMascota = function (mascota) {
    this.mascotas.push(mascota);
};

Usuario.prototype.getMascotas = function () {
    return this.mascotas.length;
};

Usuario.prototype.addBook = function (book, autor) {
    const NUEVO_LIBRO = {
        nombre : book,
        autor : autor
    };
    this.libros.push(NUEVO_LIBRO);
};

Usuario.prototype.getBook = function () {
    let libros_nombres = [];
    this.libros.map((e) => {
        libros_nombres.push(e.nombre);
    });
    return libros_nombres;
};

// Testeo
const arreglo_mascotas = [
    "Teo",
    "Nina"
];

const arreglo_libros = [
    {
        nombre: "Anaconda",
        autor: "Facundo Quiroga"
    },
]

const usuario = new Usuario("Matilda", "Wormwood", arreglo_libros, arreglo_mascotas);
usuario.addMascota("Michurri");
usuario.addBook("Sayonara","James A. Michener");

console.log(usuario.getFullname());
console.log(`Hay ${usuario.getMascotas()} mascotas`);
console.log(usuario.getBook());

