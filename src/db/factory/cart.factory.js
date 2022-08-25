import CartDaoMongoDB from '../daos/cart.dao.mongoDB.js';

class CartFactory {
    create() {
        return CartDaoMongoDB.getInstance();
    }
}

export default CartFactory;