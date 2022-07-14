import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js';
import { ProductoModel } from '../../contenedores/mongooseModels/ProductoModel.js';

class ProductosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super(ProductoModel);
    }
}

export default ProductosDaoMongoDB;