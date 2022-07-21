import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js';
import { ProductoModel } from '../../contenedores/mongooseModels/ProductoModel.js';

let instance = null;

class ProductosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super(ProductoModel);
    }

    static getInstance() {
        if (!instance) {
            instance = new ProductosDaoMongoDB();
        }

        return instance;
    }
}

export default ProductosDaoMongoDB;