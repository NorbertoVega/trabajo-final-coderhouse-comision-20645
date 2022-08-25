import CartFactory from "../factory/cart.factory.js";

class CartRepository {
    
    constructor() {
        this.cartDao = new CartFactory().create();
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
        return await this.cartDao.deleteById(id);
    }

    async deleteAll() {
        return await this.cartDao.deleteAll();
    }

    async updateById(id, cart) {
        return await this.cartDao.updateById(id, cart);
    }

    async getByEmail(id) {
        return await this.cartDao.getByEmail(id);
    }
}

export default CartRepository;