import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js';

let instance = null;

class CarritosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('src/contenedores/files/carrito.txt');
    }

    static getInstance() {
        if (!instance) {
            instance = new CarritosDaoArchivo();
        }

        return instance;
    }
}

export default CarritosDaoArchivo;