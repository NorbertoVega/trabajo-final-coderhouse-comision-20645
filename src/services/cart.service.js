import CartRepository from '../db/repository/cart.repository.js';

const cartRepository = new CartRepository();

export async function saveCartSrv(cartToSave) {
    return await cartRepository.save(cartToSave);
}

export async function deleteCartSrv(id) {
    return await cartRepository.deleteById(id);
}

export async function getCartByIdSrv(cartId) {
    return await cartRepository.getById(cartId);
}

export async function updateCartByIdSrv(cartId, cart) {
    return await cartRepository.updateById(cartId, cart);
}

export async function isProductInCartSrv(cart, productId) {
    const filtered = cart.products.filter(p => p._id.toString() == productId);

    if (filtered.length === 0)
        return false;
    return true;
}

export async function getIndexInCartSrv(cart, productId) {
    return cart.products.findIndex(item => item.productId == productId);
}

export async function deleteProductFromCartSrv(cart, cartId, productId) {
    cart.products = cart.products.filter(p => p.productId != productId);
    return await cartRepository.updateById(cartId, cart);
}

export async function getCartByEmailSrv(email) {
    return await cartRepository.getByEmail(email);
}