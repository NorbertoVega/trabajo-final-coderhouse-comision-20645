import ProductosRepo from "../repository/productos.repository.js";

const productRepo = new ProductosRepo();

export async function getAllProductsService() {
    return await productRepo.getAll();
}

export async function getProductoByIdService(id) {
    return await productRepo.getById(id);
}

export async function saveProductService(productToSave) {
    return await productRepo.save(productToSave);
}

export async function updateProductByIdService(id, productToUpdate) {
    return await productRepo.updateById(id, productToUpdate);
}

export async function deleteProductByIdService(id) {
    return productRepo.deleteById(id);
}