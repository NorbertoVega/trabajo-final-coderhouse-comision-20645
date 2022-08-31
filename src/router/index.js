import { Router } from 'express';
import express from 'express';
import product from './product.router.js';
import cart from './cart.router.js';
import user from './user.router.js';
import logger from '../utils/logger/logger.js';
import checkout from './checkout.router.js';
import chat from './chat.router.js';
import info from './info.router.js';
import { initializePassport } from '../utils/initPassport.js';
import { isAuth } from '../middleware/auth.js';
import { initializePersistence } from '../utils/connectToDB.js';

const router = Router();
router.use(express.json());

initializePersistence();
initializePassport(router);

router.use('/usuario', user);
router.use('/producto', isAuth, product);
router.use('/carrito', isAuth, cart);
router.use('/checkout', isAuth, checkout);
router.use('/chats', chat);
router.use('/info', info);

router.use((req, res) => {
    logger.warn(`Ruta: ${req.protocol}://${req.get('host')}${req.url}, Method: ${req.method}`);
    res.status(404).send({ error: 'El recurso solicitado no existe' });
});

export default router;