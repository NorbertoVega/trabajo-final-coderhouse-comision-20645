import CarritosDaoFactory from "../daos/carritosDaoFactory.js";

class CarritosRepo {
    
    constructor() {
        this.cartDao = new CarritosDaoFactory().create();
    }

    async save(cartToSave) {
        return await this.cartDao.save(cartToSave);
    }

    async getById(id) {
        return await this.cartDao.getById(id);
    }

    async getAll() {
        return await this.cartDao.getAll();
    }

    async deleteById(id) {
        return this.cartDao.deleteById(id);
    }

    async deleteAll() {
        return await this.cartDao.deleteAll();
    }

    async updateById(id, cart) {
        return await this.cartDao.updateById(id, cart);
    }
}

export default CarritosRepo;