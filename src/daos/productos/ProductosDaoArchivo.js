import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js';

let instance = null;

class ProductosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('src/contenedores/files/productos.txt');
    }

    static getInstance() {
        if (!instance) {
            instance = new ProductosDaoArchivo();
        }

        return instance;
    }
}

export default ProductosDaoArchivo;