import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js';
import { CarritoModel } from '../../contenedores/mongooseModels/CarritoModel.js'

class CarritosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super(CarritoModel);
    }
}

export default CarritosDaoMongoDB;