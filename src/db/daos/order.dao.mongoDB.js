import MongoDBContainer from '../container/mongoDB.container.js';
import { OrderModel } from '../mongooseModels/order.model.js';

let instance = null;

class OrderDaoMongoDB extends MongoDBContainer {

    constructor() {
        super(OrderModel);
    }

    static getInstance() {
        if (!instance) {
            instance = new OrderDaoMongoDB();
        }

        return instance;
    }
}

export default OrderDaoMongoDB;