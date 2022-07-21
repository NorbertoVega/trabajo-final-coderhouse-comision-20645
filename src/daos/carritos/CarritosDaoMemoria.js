import ContenedorMemoria from '../../contenedores/ContenedorMemoria.js';

let instance = null;

class CarritosDaoMemoria extends ContenedorMemoria {

    constructor() {
        super();
    }

    static getInstance() {
        if (!instance) {
            instance = new CarritosDaoMemoria();
        }

        return instance;
    }
}

export default CarritosDaoMemoria;