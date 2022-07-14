import CarritosDaoMongoDB from '../daos/carritos/CarritosDaoMongoDB.js';
import config from '../../config.js';

export const cartDao = new CarritosDaoMongoDB();

export async function guardarCarritoService(cartToSave) {
    return await cartDao.save(cartToSave);
}

export async function borrarCarritoService(id) {
    return await cartDao.deleteById(id);
}

export async function getCarritoByIdService(cartId) {
    return await cartDao.getById(cartId);
}

export async function updateCarritoByIdService(cartId, cart) {
    return await cartDao.updateById(cartId, cart);
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
        
    return await cartDao.updateById(cartId, cart);
}

