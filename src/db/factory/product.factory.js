import ProductDaoMongoDB from '../daos/product.dao.mongoDB.js';

class ProductFactory {
    create() {
        return ProductDaoMongoDB.getInstance();
    }
}

export default ProductFactory;