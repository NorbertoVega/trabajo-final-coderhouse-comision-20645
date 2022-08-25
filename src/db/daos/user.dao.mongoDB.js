import MongoDBContainer from '../container/mongoDB.container.js';
import { UserModel } from '../mongooseModels/user.model.js';

let instance = null;

class UserDaoMongoDB extends MongoDBContainer {

    constructor() {
        super(UserModel);
    }

    static getInstance() {
        if (!instance) {
            instance = new UserDaoMongoDB();
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

    async updateByEmail(email, user) {
        try {
            const itemToUpdate = await this.getByEmail(email);
            console.log({itemToUpdate});
            if (itemToUpdate !== null) {
                await this.model.updateOne({ _id: itemToUpdate._id }, user);
                return itemToUpdate._id;
            }
            else
                return null;
        }
        catch (error) {
            logger.error(`ContenedorMongoDB-updateById(). Error: ${error}`);
            return null;
        }
    }
}

export default UserDaoMongoDB;