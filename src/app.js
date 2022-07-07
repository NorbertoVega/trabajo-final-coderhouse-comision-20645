import express from 'express';
import { json } from 'express';
import product from './router/product.js';
import carrito from './router/carrito.js';
import usuario from './router/usuario.js';
import logger from './logger/logger.js';
import { isAuth } from './router/usuario.js';

const server = express();

server.use(json());
server.use(express.urlencoded({ extended: true }));

server.use('/api/productos', product);
server.use('/api/carrito', carrito);
server.use('/api/usuario', usuario);

server.use((req, res) => {
    logger.warn(`Ruta: ${req.protocol}://${req.get('host')}${req.url}, Method: ${req.method}`);
    res.status(404).send({ error: 'El recurso solicitado no existe' });
});

export default server;