import logger from '../logger/logger.js';
import { getProductoByIdService } from '../services/producto.service.js';
import {
    guardarCarritoService,
    borrarCarritoService,
    getCarritoByIdService,
    updateCarritoByIdService,
    productoExisteEnCarritoService,
    borrarProductoDelCarritoService } from '../services/carrito.service.js';

export async function crearCarritoController(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/carrito${req.url}, Method: ${req.method}`);
        const cartToSave = { timestamp: Date.now(), productos: [] }
        const id = await guardarCarritoService(cartToSave);
        res.send({ idCarritoGuardado: id });
    }
    catch (err) {
        logger.error(`Error al crear carrito: ${err}`);
        res.status(400).send(err);
    }
}

export async function borrarCarritoController(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/carrito${req.url}, Method: ${req.method}`);
        const id = req.params.id;
        const idDeleted = await borrarCarritoService(id);
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

export async function agregarProductoACarritoController(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/carrito${req.url}, Method: ${req.method}`);
        const cartId = req.params.id;
        const productId = req.params.id_prod;
        const productById = await getProductoByIdService(productId);
        if (productById === null) {
            logger.error(`No se pudo agregar al carrito. Producto no encontrado.`);
            res.status(404).send({ error: -4, descripcion: 'No se pudo agregar al carrito. Producto no encontrado.' });
            return;
        }

        const cartById = await getCarritoByIdService(cartId);
        if (cartById === null) {
            logger.error('No se pudo agregar al carrito. Carrito no encontrado.');
            res.status(404).send({ error: -4, descripcion: 'No se pudo agregar al carrito. Carrito no encontrado.' });
            return;
        }
        cartById.productos.push(productById);

        const idUpdated = await updateCarritoByIdService(cartId, cartById);
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

export async function obtenerProductosCarritoController(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/carrito${req.url}, Method: ${req.method}`);
        const cartId = req.params.id;
        const cartById = await getCarritoByIdService(cartId);
        if (cartById === null) {
            logger.error('No se pudieron obtener los productos. Carrito no encontrado.');
            res.status(404).send({ error: -4, descripcion: 'No se pudieron obtener los productos. Carrito no encontrado.' });
            return;
        }
        res.send({ productos: cartById.productos });
    }
    catch (err) {
        logger.error(`Error al obtener los productos del carrito: ${err}`);
        res.status(400).send(err);
    }
}

export async function borrarProductoDelCarritoController(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/carrito${req.url}, Method: ${req.method}`);
        const cartId = req.params.id;
        const productId = req.params.id_prod;

        const cartById = await getCarritoByIdService(cartId);
        if (cartById === null) {
            logger.error('No se pudo eliminar del carrito. Carrito no encontrado.');
            res.status(404).send({ error: -4, descripcion: 'No se pudo eliminar del carrito. Carrito no encontrado.' });
            return;
        }

        if (!productoExisteEnCarritoService(cartById, productId)) {
            logger.error('No se pudo eliminar del carrito. Producto no encontrado.');
            res.status(404).send({ error: -4, descripcion: 'No se pudo eliminar del carrito. Producto no encontrado.' });
            return;
        }

        const idUpdated = await borrarProductoDelCarritoService(cartById, cartId, productId);
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
