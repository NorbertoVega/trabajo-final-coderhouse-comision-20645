import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js';
import { CarritoModel } from '../../contenedores/mongooseModels/CarritoModel.js'

let instance = null;

class CarritosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super(CarritoModel);
    }

    static getInstance() {
        if (!instance) {
            instance = new CarritosDaoMongoDB();
        }

        return instance;
    }
}

export default CarritosDaoMongoDB;