import { Router } from 'express';
import express from 'express';
import product from './producto.js';
import carrito from './carrito.js';
import usuario from './usuario.js';
import logger from '../logger/logger.js';
import checkout from './checkout.js';
import { initializePassport } from '../utils/initPassport.js';
import { isAuth } from '../middleware/auth.js';
import { initializePersistence } from '../utils/connectToDB.js';

const router = Router();
router.use(express.json());

initializePersistence();
initializePassport(router);

router.use('/usuario', usuario);
router.use('/producto', isAuth, product);
router.use('/carrito', isAuth, carrito);
router.use('/checkout', isAuth, checkout);

router.use((req, res) => {
    logger.warn(`Ruta: ${req.protocol}://${req.get('host')}${req.url}, Method: ${req.method}`);
    res.status(404).send({ error: 'El recurso solicitado no existe' });
});

export default router;