import ContenedorMemoria from '../../contenedores/ContenedorMemoria.js';

let instance = null;

class ProductosDaoMemoria extends ContenedorMemoria {

    constructor() {
        super();
    }

    static getInstance() {
        if (!instance) {
            instance = new ProductosDaoMemoria();
        }

        return instance;
    }
}

export default ProductosDaoMemoria;