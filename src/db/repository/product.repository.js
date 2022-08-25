import ProductFactory from "../factory/product.factory.js";

class ProductRepository {
    
    constructor() {
        this.productDao = new ProductFactory().create();
    }

    async save(productToSave) {
        return await this.productDao.save(productToSave);
    }

    async getById(id) {
        return await this.productDao.getById(id);
    }

    async getAll() {
        return await this.productDao.getAll();
    }

    async deleteById(id) {
        return this.productDao.deleteById(id);
    }

    async deleteAll() {
        return await this.productDao.deleteAll();
    }

    async updateById(id, productToUpdate) {
        return await this.productDao.updateById(id, productToUpdate);
    }
}

export default ProductRepository;