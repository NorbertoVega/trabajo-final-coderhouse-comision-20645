import MessageDaoMongoDB from '../daos/message.dao.mongoDB.js';

class MessageFactory {
    create() {
        return MessageDaoMongoDB.getInstance();
    }
}

export default MessageFactory;