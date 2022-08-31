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

    async getByCategory(category) {
        try {
            let response = await this.model.find({ category: category }, { __v: 0 });
            if (response.length !== 0)
                return response;
            else
                return null;
        }
        catch (error) {
            logger.error(`ContenedorMongoDB-getByEmail(). Error: ${error}`);
            return null;
        }
    }
}

export default ProductDaoMongoDB;