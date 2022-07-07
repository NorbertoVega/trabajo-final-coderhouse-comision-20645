import { Router } from 'express';
import ProductosDaoMongoDB from '../daos/productos/ProductosDaoMongoDB.js';
import logger from '../logger/logger.js';

const router = Router();
export const productDao = new ProductosDaoMongoDB(true);

router.get('/', async (req, res) => {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/productos${req.url}, Method: ${req.method}`);
        const allProducts = await productDao.getAll()
        res.send({ productos: allProducts });
    }
    catch (err) {
        logger.error(`Error al otener todos los productos: ${err}`);
        res.status(400).send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/productos${req.url}, Method: ${req.method}`);
        const id = req.params.id;
        const productById = await productDao.getById(id);
        if (productById === null) {
            logger.error('Producto no encontrado.');
            res.status(404).send({ error: -4, descripcion: 'Producto no encontrado.' });
            return;
        }
        res.send(productById);
    }
    catch (err) {
        logger.error(`Error al obtener producto: ${err}`);
        res.status(400).send(err);
    }
});

function validateBodyAndAuthenticate(req, res, next) {
    const body = req.body;
    req.invalidBody = body.nombre == null || body.descripcion == null || body.codigo == null ||
        body.url == null || body.precio == null || body.stock == null;

    if (body.admin != null && body.admin != undefined)
        req.isAdmin = body.admin;

    next();
}

router.post('/', validateBodyAndAuthenticate, async (req, res) => {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/productos${req.url}, Method: ${req.method}`);
        const product = req.body;
        let { invalidBody, isAdmin } = req;
        if (!isAdmin) {
            logger.error('Ruta: /api/productos método:POST no autorizada.');
            res.status(403).send({ error: -1, descripcion: 'Ruta: /api/productos método:POST no autorizada.' });
            return;
        }
        if (invalidBody) {
            logger.error('Producto a agregar con formato inválido.');
            res.status(400).send({ error: -3, descripcion: 'Producto a agregar con formato inválido.' });
            return;
        }
        delete product.admin;
        const productToSave = { ...product, timestamp: Date.now() }
        const id = await productDao.save(productToSave);

        res.send({ idProductoGuardado: id });

    }
    catch (err) {
        logger.error(`Error al agregar producto: ${err}`);
        res.status(400).send(err);
    }
});

router.put('/:id', validateBodyAndAuthenticate, async (req, res) => {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/productos${req.url}, Method: ${req.method}`);
        const product = req.body;
        const id = req.params.id;
        let { invalidBody, isAdmin } = req;
        if (!isAdmin) {
            logger.error('Ruta: /api/productos método:PUT no autorizada.');
            res.status(403).send({ error: -1, descripcion: 'Ruta: /api/productos método:PUT no autorizada.' });
            return;
        }
        if (invalidBody) {
            logger.error('Producto a actualizar con formato inválido.');
            res.status(400).send({ error: -3, descripcion: 'Producto a actualizar con formato inválido.' });
            return;
        }
        delete product.admin;
        const productToUpdate = { ...product, timestamp: Date.now() }
        const idUpdated = await productDao.updateById(id, productToUpdate);
        if (idUpdated !== null) {
            res.send({ idProductoActualizado: idUpdated })
            return;
        }
        logger.error('Producto no encontrado. No se pudo actualizar.');
        res.status(404).send({ error: -4, descripcion: 'Producto no encontrado. No se pudo actualizar.' });
    }
    catch (err) {
        logger.error(`Error al actualizar producto: ${err}`);
        res.status(400).send(err);
    }
});

router.delete('/:id', validateBodyAndAuthenticate, async (req, res) => {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/productos${req.url}, Method: ${req.method}`);
        const id = req.params.id;
        let { isAdmin } = req;
        if (!isAdmin) {
            logger.error('Ruta: /api/productos método:DELETE no autorizada.');
            res.status(403).send({ error: -1, descripcion: 'Ruta: /api/productos método:DELETE no autorizada.' });
            return;
        }
        const idDeleted = await productDao.deleteById(id);
        if (idDeleted === null) {
            logger.error('Producto no encontrado. No se pudo eliminar.');
            res.status(404).send({ error: -4, descripcion: 'Producto no encontrado. No se pudo eliminar.' });
            return;
        }
        res.send({ idProductoEliminado: idDeleted });
    }
    catch (err) {
        logger.error(`Error al eliminar producto: ${err}`);
        res.status(400).send(err);
    }
});

export default router;
