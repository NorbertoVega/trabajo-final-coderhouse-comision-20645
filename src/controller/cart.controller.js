import logger from '../utils/logger/logger.js';
import { getProductByIdSrv } from '../services/product.service.js';
import {
    saveCartSrv,
    deleteCartSrv,
    getCartByIdSrv,
    updateCartByIdSrv,
    isProductInCartSrv,
    deleteProductFromCartSrv,
    getCartByEmailSrv,
    getIndexInCartSrv } from '../services/cart.service.js';
import { CartDTO } from '../dto/cart.dto.js';
import { getUserByEmail } from '../services/user.service.js';
import { CartItemDTO } from '../dto/cartItem.dto.js';

export async function saveCart(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/carrito${req.url}, Method: ${req.method}`);
        const { email } = req.body;
        const user = await getUserByEmail(email);
        if (user === null) {
            logger.error(`Usuario no encontrado. No se pudo guardar carrito.`);
            res.status(404).send({ error: -4, descripcion: 'Usuario no encontrado. No se pudo guardar carrito.' });
            return;
        }
        const cart = await getCartByEmailSrv(email);
        if (cart !== null) {
            logger.error('El carrito ya existe');
            res.status(400).send({error: -7, descripcion: 'El carrito ya existe', idCarritoEncontrado: cart._id});
            return;
        }
        const cartToSave = new CartDTO(email, user.address);
        const id = await saveCartSrv(cartToSave);
        res.send({ idCarritoGuardado: id });
    }
    catch (err) {
        logger.error(`Error al crear carrito: ${err}`);
        res.status(400).send(err);
    }
}

export async function deleteCart(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/carrito${req.url}, Method: ${req.method}`);
        const id = req.params.id;
        const idDeleted = await deleteCartSrv(id);
        if (idDeleted === null) {
            logger.error(`Carrito no encontrado. No se pudo eliminar.`);
            res.status(404).send({ error: -4, descripcion: 'Carrito no encontrado. No se pudo eliminar.' });
            return;
        }
        res.send({ idCarritoEliminado: idDeleted })
    }
    catch (err) {
        logger.error(`Error al borrar carrito: ${err}`);
        res.status(400).send(err);
    }
}

export async function addProductToCart(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/carrito${req.url}, Method: ${req.method}`);
        const cartId = req.params.id;
        const productId = req.params.id_prod;
        const { quantity } = req.body;
        const productById = await getProductByIdSrv(productId);
        if (productById === null) {
            logger.error(`No se pudo agregar al carrito. Producto no encontrado.`);
            res.status(404).send({ error: -4, descripcion: 'No se pudo agregar al carrito. Producto no encontrado.' });
            return;
        }
        if (productById.stock === 0 || productById.stock < quantity) {
            logger.error(`No se pudo agregar al carrito. No hay suficiente stock.`);
            res.status(404).send({ error: -4, descripcion: 'No se pudo agregar al carrito. No hay suficiente stock.' });
            return;
        }
        const cartById = await getCartByIdSrv(cartId);
        if (cartById === null) {
            logger.error('No se pudo agregar al carrito. Carrito no encontrado.');
            res.status(404).send({ error: -4, descripcion: 'No se pudo agregar al carrito. Carrito no encontrado.' });
            return;
        }
        const index = await getIndexInCartSrv(cartById, productId);
        if (index === -1) {
            const cartItem = new CartItemDTO(productId, productById.code, productById.name, productById.unitPrice, quantity);
            cartById.products.push(cartItem);
        }
        else {
            cartById.products[index].quantity += quantity;
        }

        const idUpdated = await updateCartByIdSrv(cartId, cartById);
        if (idUpdated == null) {
            logger.error('No se pudo agregar al carrito. Hubo un problema al actualizar el carrito.');
            res.status(400).send({ error: -5, descripcion: 'No se pudo agregar al carrito. Hubo un problema al actualizar el carrito.' });
            return;
        }
        res.send({ idCarritoActualizado: idUpdated });
    }
    catch (err) {
        logger.error(`Error al agregar producto al carrito: ${err}`);
        res.status(400).send(err);
    }
}

export async function getProductsFromCart(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/carrito${req.url}, Method: ${req.method}`);
        const cartId = req.params.id;
        const cartById = await getCartByIdSrv(cartId);
        if (cartById === null) {
            logger.error('No se pudieron obtener los productos. Carrito no encontrado.');
            res.status(404).send({ error: -4, descripcion: 'No se pudieron obtener los productos. Carrito no encontrado.' });
            return;
        }
        res.send({ productos: cartById.products });
    }
    catch (err) {
        logger.error(`Error al obtener los productos del carrito: ${err}`);
        res.status(400).send(err);
    }
}

export async function deleteProductFromCart(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/carrito${req.url}, Method: ${req.method}`);
        const cartId = req.params.id;
        const productId = req.params.id_prod;

        const cartById = await getCartByIdSrv(cartId);
        if (cartById === null) {
            logger.error('No se pudo eliminar del carrito. Carrito no encontrado.');
            res.status(404).send({ error: -4, descripcion: 'No se pudo eliminar del carrito. Carrito no encontrado.' });
            return;
        }

        if (!isProductInCartSrv(cartById, productId)) {
            logger.error('No se pudo eliminar del carrito. Producto no encontrado.');
            res.status(404).send({ error: -4, descripcion: 'No se pudo eliminar del carrito. Producto no encontrado.' });
            return;
        }

        const idUpdated = await deleteProductFromCartSrv(cartById, cartId, productId);
        if (idUpdated == null) {
            logger.error('No se pudo eliminar del carrito. Hubo un problema al actualizar el carrito.');
            res.status(400).send({ error: -5, descripcion: 'No se pudo eliminar del carrito. Hubo un problema al actualizar el carrito.' });
            return;
        }
        res.send({ idCarritoActualizado: idUpdated });
    }
    catch (err) {
        logger.error(`Error al eliminar producto del carrito: ${err}`);
        res.status(400).send(err);
    }
}
