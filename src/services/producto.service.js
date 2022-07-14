import ProductosDaoMongoDB from "../daos/productos/ProductosDaoMongoDB.js";

export const productDao = new ProductosDaoMongoDB();

export async function getAllProductsService() {
    return await productDao.getAll();
}

export async function getProductoByIdService(id) {
    return await productDao.getById(id);
}

export async function saveProductService(productToSave) {
    return await productDao.save(productToSave);
}

export async function updateProductByIdService(id, productToUpdate) {
    return await productDao.updateById(id, productToUpdate);
}

export async function deleteProductByIdService(id) {
    return productDao.deleteById(id);
}