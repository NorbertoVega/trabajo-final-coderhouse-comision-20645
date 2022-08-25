import logger from '../utils/logger/logger.js';
import { 
    getAllProductsSrv,
    getProductByIdSrv,
    saveProductSrv,
    updateProductByIdSrv,
    deleteProductByIdSrv } from '../services/product.service.js';

import { isAdmin } from '../services/user.service.js';
import { ProductDTO } from '../dto/product.dto.js';

export async function getAllProducts(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/productos${req.url}, Method: ${req.method}`);
        const allProducts = await getAllProductsSrv();
        res.send({ productos: allProducts });
    }
    catch (err) {
        logger.error(`Error al otener todos los productos: ${err}`);
        res.status(400).send(err);
    }
}

export async function getProductById(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/productos${req.url}, Method: ${req.method}`);
        const id = req.params.id;
        const productById = await getProductByIdSrv(id);
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
}

export async function saveProduct(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/productos${req.url}, Method: ${req.method}`);
        const { code, name, description, category, unitPrice, stock, imageUrl } = req.body;
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
        const productToSave = new ProductDTO(code, name, description, category, unitPrice, stock, imageUrl);
        const id = await saveProductSrv(productToSave);

        res.send({ idProductoGuardado: id });

    }
    catch (err) {
        logger.error(`Error al agregar producto: ${err}`);
        res.status(400).send(err);
    }
}

export async function updateProduct(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/productos${req.url}, Method: ${req.method}`);
        const { code, name, description, category, unitPrice, stock, imageUrl } = req.body;
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
        const productToUpdate = new ProductDTO(code, name, description, category, unitPrice, stock, imageUrl);
        const idUpdated = await updateProductByIdSrv(id, productToUpdate);
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
}

export async function deleteProduct(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/productos${req.url}, Method: ${req.method}`);
        const id = req.params.id;
        let { isAdmin } = req;
        if (!isAdmin) {
            logger.error('Ruta: /api/productos método:DELETE no autorizada.');
            res.status(403).send({ error: -1, descripcion: 'Ruta: /api/productos método:DELETE no autorizada.' });
            return;
        }
        const idDeleted = await deleteProductByIdSrv(id);
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
}
