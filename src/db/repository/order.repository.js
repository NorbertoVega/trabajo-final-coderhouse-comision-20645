import OrderFactory from "../factory/order.factory.js";

class OrderRepository {
    
    constructor() {
        this.orderDao = new OrderFactory().create();
    }

    async save(cartToSave) {
        return await this.orderDao.save(cartToSave);
    }

    async getById(id) {
        return await this.orderDao.getById(id);
    }

    async getAll() {
        return await this.orderDao.getAll();
    }

    async deleteById(id) {
        return await this.orderDao.deleteById(id);
    }

    async deleteAll() {
        return await this.orderDao.deleteAll();
    }

    async updateById(id, cart) {
        return await this.orderDao.updateById(id, cart);
    }
}

export default OrderRepository;