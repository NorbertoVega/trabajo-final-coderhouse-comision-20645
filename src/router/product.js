const { Router } = require('express');
const router = Router();
const Contenedor = require('../data/contenedor.js');

const productContainer = new Contenedor('src/data/files/productos.txt');

router.get('/', async (req, res) => {
    try {
        const allProducts = await productContainer.getAll()
        res.send({ productos: allProducts });
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const productById = await productContainer.getById(id);
        if (productById === null) {
            res.status(404).send({ error: -4, descripcion: 'Producto no encontrado.' });
            return;
        }
        res.send(productById);
    }
    catch (err) {
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
        const product = req.body;
        let { invalidBody, isAdmin } = req;
        if (!isAdmin) {
            res.status(403).send({ error: -1, descripcion: 'Ruta: /api/productos método:POST no autorizada.' });
            return;
        }
        if (invalidBody) {
            res.status(400).send({ error: -3, descripcion: 'Producto a ingresar con formato inválido.' });
            return;
        }
        delete product.admin;
        const productToSave = { ...product, timestamp: Date.now() }
        const id = await productContainer.save(productToSave);
        if (!isNaN(id)) {
            res.send({ idProductoGuardado: id });
            return;
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.put('/:id', validateBodyAndAuthenticate, async (req, res) => {
    try {
        const product = req.body;
        const id = Number(req.params.id);
        let { invalidBody, isAdmin } = req;
        if (!isAdmin) {
            res.status(403).send({ error: -1, descripcion: 'Ruta: /api/productos método:PUT no autorizada.' });
            return;
        }
        if (invalidBody) {
            res.status(400).send({ error: -3, descripcion: 'Producto a actualizar con formato inválido.' });
            return;
        }
        delete product.admin;
        const productToUpdate = { ...product, timestamp: Date.now() }
        const idUpdated = await productContainer.updateById(id, productToUpdate);
        if (idUpdated !== null) {
            res.send({ idProductoActualizado: idUpdated })
            return;
        }
        res.status(404).send({ error: -4, descripcion: 'Producto no encontrado. No se pudo actualizar.' });
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/:id', validateBodyAndAuthenticate, async (req, res) => {
    try {
        const id = Number(req.params.id);
        let { isAdmin } = req;
        if (!isAdmin) {
            res.status(403).send({ error: -1, descripcion: 'Ruta: /api/productos método:DELETE no autorizada.' });
            return;
        }
        const idDeleted = await productContainer.deleteById(id);
        if (idDeleted === null) {
            res.status(404).send({ error: -4, descripcion: 'Producto no encontrado. No se pudo eliminar.' });
            return;
        }
        res.send({ idProductoEliminado: idDeleted });
    }
    catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;