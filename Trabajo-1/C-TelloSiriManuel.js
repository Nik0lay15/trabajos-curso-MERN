// Clase Usuario
class Usuario{
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
    }

    getMascotas() {
        return this.mascotas.length;
    }

    addBook(book, autor) {
        const NUEVO_LIBRO = {
            nombre : book,
            autor : autor
        };
        this.libros.push(NUEVO_LIBRO);
    }

    getBook() {
        let libros_nombres = [];
        this.libros.map((e) => {
            libros_nombres.push(e.nombre);
        });
        return libros_nombres;
    }
}

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

console.log(usuario.getFullName());
console.log(`Hay ${usuario.getMascotas()} mascotas`);
console.log(usuario.getBook());
