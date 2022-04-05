const { Router } = require('express');
const router = Router();
const Contenedor = require('../data/contenedor.js');

const cartContainer = new Contenedor('src/data/files/carrito.txt');
const productContainer = new Contenedor('src/data/files/productos.txt');

router.post('/', async (req, res) => {
    try {
        const cartToSave = { timestamp: Date.now(), productos: [] }
        const id = await cartContainer.save(cartToSave);
        if (!isNaN(id)) {
            res.send({ idCarritoGuardado: id });
            return;
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const idDeleted = await cartContainer.deleteById(id);
        if (idDeleted === null) {
            res.status(404).send({ error: -4, descripcion: 'Carrito no encontrado. No se pudo eliminar.' });
            return;
        }
        res.send({ idProductoEliminado: idDeleted })
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.post('/:id/productos/:id_prod', async (req, res) => {
    try {
        const cartId = Number(req.params.id);
        const productId = Number(req.params.id_prod);

        const productById = await productContainer.getById(productId);
        if (productById === null) {
            res.status(404).send({ error: -4, descripcion: 'No se pudo agregar al carrito. Producto no encontrado.' });
            return;
        }

        const cartById = await cartContainer.getById(cartId);
        if (cartById === null) {
            res.status(404).send({ error: -4, descripcion: 'No se pudo agregar al carrito. Carrito no encontrado.' });
            return;
        }
        cartById.productos.push(productById);

        const idUpdated = await cartContainer.updateById(cartId, cartById);
        if (idUpdated == null) {
            res.status(400).send({ error:-5, descripcion: 'No se pudo agregar al carrito. Hubo un problema al actualizar el carrito.'});
            return;
        }
        res.send({ idCarritoActualizado: idUpdated });
    }
    catch (err) {
        res.status(400).send(err);
    }
});


router.get('/:id/productos', async (req, res) => {
    try {
        const cartId = Number(req.params.id);
        const cartById = await cartContainer.getById(cartId);
        if (cartById === null) {
            res.status(404).send({ error: -4, descripcion: 'No se pudieron obtener los productos. Carrito no encontrado.' });
            return;
        }
        res.send({ productos: cartById.productos });
    }
    catch (err) {
        res.status(400).send(err);
    }
});


router.delete('/:id/productos/:id_prod', async (req, res) => {
    try {
        const cartId = Number(req.params.id);
        const productId = Number(req.params.id_prod);

        const cartById = await cartContainer.getById(cartId);
        if (cartById === null) {
            res.status(404).send({ error: -4, descripcion: 'No se pudo eliminar del carrito. Carrito no encontrado.' });
            return;
        }

        const filtered = cartById.productos.filter(p => p.id === productId);
        if (filtered.length === 0) {
            res.status(404).send({ error: -4, descripcion: 'No se pudo eliminar del carrito. Producto no encontrado.' });
            return;
        }

        cartById.productos = cartById.productos.filter(p => p.id !== productId);

        const idUpdated = await cartContainer.updateById(cartId, cartById);
        if (idUpdated == null) {
            res.status(400).send({ error:-5, descripcion: 'No se pudo eliminar del carrito. Hubo un problema al actualizar el carrito.'});
            return;
        }
        res.send({ idCarritoActualizado: idUpdated });
    }
    catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;