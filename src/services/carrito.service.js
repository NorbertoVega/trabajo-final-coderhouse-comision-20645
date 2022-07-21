import CarritosRepo from '../repository/carritos.repository.js';
import config from '../../config.js';

const cartRepo = new CarritosRepo();

export async function guardarCarritoService(cartToSave) {
    return await cartRepo.save(cartToSave);
}

export async function borrarCarritoService(id) {
    return await cartRepo.deleteById(id);
}

export async function getCarritoByIdService(cartId) {
    return await cartRepo.getById(cartId);
}

export async function updateCarritoByIdService(cartId, cart) {
    return await cartRepo.updateById(cartId, cart);
}

export async function productoExisteEnCarritoService(cart, productId) {
    let filtered
    if (config.PERSISTENCE === 'MONGODB')
        filtered = cart.productos.filter(p => p._id.toString() == productId);
    else
        filtered = cart.productos.filter(p => p.id == productId);

    if (filtered.length === 0)
        return false;
    return true;
}

export async function borrarProductoDelCarritoService(cart, cartId, productId) {
    if (config.PERSISTENCE === 'MONGODB')
        cart.productos = cart.productos.filter(p => p._id.toString() != productId);
    else
        cart.productos = cart.productos.filter(p => p.id != productId);
        
    return await cartRepo.updateById(cartId, cart);
}

