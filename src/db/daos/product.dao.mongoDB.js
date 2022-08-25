import MongoDBContainer from '../container/mongoDB.container.js';
import { ProductModel } from '../mongooseModels/product.model.js';

let instance = null;

class ProductDaoMongoDB extends MongoDBContainer {

    constructor() {
        super(ProductModel);
    }

    static getInstance() {
        if (!instance) {
            instance = new ProductDaoMongoDB();
        }

        return instance;
    }
}

export default ProductDaoMongoDB;