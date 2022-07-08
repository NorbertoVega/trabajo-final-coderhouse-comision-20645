import { Router } from 'express';
import config from '../../config.js';
import CarritosDaoMongoDB from '../daos/carritos/CarritosDaoMongoDB.js';
import logger from '../logger/logger.js';

const router = Router();

const { productDao } = await import('./product.js');
export const cartDao = new CarritosDaoMongoDB(false);

router.post('/', async (req, res) => {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/carrito${req.url}, Method: ${req.method}`);
        const cartToSave = { timestamp: Date.now(), productos: [] }
        const id = await cartDao.save(cartToSave);
        res.send({ idCarritoGuardado: id });
    }
    catch (err) {
        logger.error(`Error al crear carrito: ${err}`);
        res.status(400).send(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/carrito${req.url}, Method: ${req.method}`);
        const id = req.params.id;
        const idDeleted = await cartDao.deleteById(id);
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
});

router.post('/:id/productos/:id_prod', async (req, res) => {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/carrito${req.url}, Method: ${req.method}`);
        const cartId = req.params.id;
        const productId = req.params.id_prod;

        const productById = await productDao.getById(productId);
        if (productById === null) {
            logger.error(`No se pudo agregar al carrito. Producto no encontrado.`);
            res.status(404).send({ error: -4, descripcion: 'No se pudo agregar al carrito. Producto no encontrado.' });
            return;
        }

        const cartById = await cartDao.getById(cartId);
        if (cartById === null) {
            logger.error('No se pudo agregar al carrito. Carrito no encontrado.');
            res.status(404).send({ error: -4, descripcion: 'No se pudo agregar al carrito. Carrito no encontrado.' });
            return;
        }
        cartById.productos.push(productById);

        const idUpdated = await cartDao.updateById(cartId, cartById);
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
});


router.get('/:id/productos', async (req, res) => {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/carrito${req.url}, Method: ${req.method}`);
        const cartId = req.params.id;
        const cartById = await cartDao.getById(cartId);
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
});


router.delete('/:id/productos/:id_prod', async (req, res) => {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/carrito${req.url}, Method: ${req.method}`);
        const cartId = req.params.id;
        const productId = req.params.id_prod;

        const cartById = await cartDao.getById(cartId);
        if (cartById === null) {
            logger.error('No se pudo eliminar del carrito. Carrito no encontrado.');
            res.status(404).send({ error: -4, descripcion: 'No se pudo eliminar del carrito. Carrito no encontrado.' });
            return;
        }

        let filtered
        if (config.PERSISTENCE === 'MONGODB')
            filtered = cartById.productos.filter(p => p._id.toString() == productId);
        else
            filtered = cartById.productos.filter(p => p.id == productId);

        if (filtered.length === 0) {
            logger.error('No se pudo eliminar del carrito. Producto no encontrado.');
            res.status(404).send({ error: -4, descripcion: 'No se pudo eliminar del carrito. Producto no encontrado.' });
            return;
        }

        if (config.PERSISTENCE === 'MONGODB')
            cartById.productos = cartById.productos.filter(p => p._id.toString() != productId);
        else
            cartById.productos = cartById.productos.filter(p => p.id != productId);

        const idUpdated = await cartDao.updateById(cartId, cartById);
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
});

export default router;