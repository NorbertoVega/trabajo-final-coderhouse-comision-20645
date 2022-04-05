const express = require('express');
const { json } = require('express');
const product = require('./router/product');
const carrito = require('./router/carrito');

const server = express();

server.use(json());
server.use(express.urlencoded({ extended: true }));

server.use('/api/productos', product);
server.use('/api/carrito', carrito);

server.get('*', (req, res) => {
    res.status(404).send({ error: -2, descripcion: `ruta:${req.path} método:GET no implementada` });
});
server.post('*', (req, res) => {
    res.status(404).send({ error: -2, descripcion: `ruta:${req.path} método:POST no implementada` });
});
server.put('*', (req, res) => {
    res.status(404).send({ error: -2, descripcion: `ruta:${req.path} método:PUT no implementada` });
});
server.delete('*', (req, res) => {
    res.status(404).send({ error: -2, descripcion: `ruta:${req.path} método:DELETE no implementada` });
});

module.exports = server;