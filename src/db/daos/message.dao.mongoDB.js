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
}

export default MessageDaoMongoDB;