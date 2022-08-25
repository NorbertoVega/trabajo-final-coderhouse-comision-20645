import ProductRepository from "../db/repository/product.repository.js";

const productRepo = new ProductRepository();

export async function getAllProductsSrv() {
    return await productRepo.getAll();
}

export async function getProductByIdSrv(id) {
    return await productRepo.getById(id);
}

export async function saveProductSrv(productToSave) {
    return await productRepo.save(productToSave);
}

export async function updateProductByIdSrv(id, productToUpdate) {
    return await productRepo.updateById(id, productToUpdate);
}

export async function deleteProductByIdSrv(id) {
    return productRepo.deleteById(id);
}