import MongoDBContainer from '../container/mongoDB.container.js';
import { MessageModel } from '../mongooseModels/message.model.js';

let instance = null;

class MessageDaoMongoDB extends MongoDBContainer {

    constructor() {
        super(MessageModel);
    }

    static getInstance() {
        if (!instance) {
            instance = new MessageDaoMongoDB();
        }

        return instance;
    }

    async getByEmail(email) {
        try {
            let response = await this.model.find({ email: email }, { __v: 0 });
            if (response.length !== 0)
                return response;
            else
                return [];
        }
        catch (error) {
            logger.error(`ContenedorMongoDB-getByEmail(). Error: ${error}`);
            return null;
        }
    }
}

export default MessageDaoMongoDB;