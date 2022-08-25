import MessageFactory from "../factory/message.factory.js";

class MessageRepository {
    
    constructor() {
        this.messageDao = new MessageFactory().create();
    }

    async save(cartToSave) {
        return await this.messageDao.save(cartToSave);
    }

    async getById(id) {
        return await this.messageDao.getById(id);
    }

    async getAll() {
        return await this.messageDao.getAll();
    }

    async deleteById(id) {
        return await this.messageDao.deleteById(id);
    }

    async deleteAll() {
        return await this.messageDao.deleteAll();
    }

    async updateById(id, cart) {
        return await this.messageDao.updateById(id, cart);
    }
}

export default MessageRepository;