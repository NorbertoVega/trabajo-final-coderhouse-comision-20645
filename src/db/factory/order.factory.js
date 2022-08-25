import OrderDaoMongoDB from '../daos/order.dao.mongoDB.js';

class OrderFactory {
    create() {
        return OrderDaoMongoDB.getInstance();
    }
}

export default OrderFactory;