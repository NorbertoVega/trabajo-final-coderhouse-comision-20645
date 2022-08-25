import MongoDBContainer from '../container/mongoDB.container.js';
import { CartModel } from '../mongooseModels/cart.model.js';

let instance = null;

class CartDaoMongoDB extends MongoDBContainer {

    constructor() {
        super(CartModel);
    }

    static getInstance() {
        if (!instance) {
            instance = new CartDaoMongoDB();
        }

        return instance;
    }

    async getByEmail(email) {
        try {
            let response = await this.model.find({ email: email }, { __v: 0 });
            if (response.length !== 0)
                return response[0];
            else
                return null;
        }
        catch (error) {
            logger.error(`ContenedorMongoDB-getByEmail(). Error: ${error}`);
            return null;
        }
    }
}

export default CartDaoMongoDB;