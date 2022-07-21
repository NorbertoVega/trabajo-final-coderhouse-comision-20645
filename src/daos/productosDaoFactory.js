import ProductosDaoMongoDB from './productos/ProductosDaoMongoDB.js';
import ProductosDaoMemoria from './productos/ProductosDaoMemoria.js';
import ProductosDaoArchivo from './productos/ProductosDaoArchivo.js';
import config from '../../config.js'

class ProductosDaoFactory {
    create() {
        switch (config.PERSISTENCE) {
            case 'MONGODB':
                return ProductosDaoMongoDB.getInstance();
            case 'MEMORIA':
                return ProductosDaoMemoria.getInstance();
            case 'ARCHIVO':
                return ProductosDaoArchivo.getInstance();
            default:
                return ProductosDaoMongoDB.getInstance();
        }
    }
}

export default ProductosDaoFactory;