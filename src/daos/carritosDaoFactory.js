import CarritosDaoMongoDB from './carritos/CarritosDaoMongoDB.js';
import CarritosDaoMemoria from './carritos/CarritosDaoMemoria.js';
import CarritosDaoArchivo from './carritos/CarritosDaoArchivos.js';
import config from '../../config.js'

class CarritosDaoFactory {
    create() {
        switch (config.PERSISTENCE) {
            case 'MEMORIA':
                return CarritosDaoMemoria.getInstance();
            case 'ARCHIVO':
                return CarritosDaoArchivo.getInstance();
            default:
                return CarritosDaoMongoDB.getInstance();
        }
    }
}

export default CarritosDaoFactory;