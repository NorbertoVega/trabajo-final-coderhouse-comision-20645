import express from 'express';
import logger from '../logger/logger.js';
import { cartDao } from './carrito.js';
import { sendEmail } from '../utils/mailSender.js';
import { sendSMS } from '../utils/smsSender.js';
import { sendWhatsApp } from '../utils/whatsAppSender.js';

const router = express();

router.post('/:id_cart', async (req, res) => {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/checkout${req.url}, Method: ${req.method}`);
        const idCart = req.params.id_cart;
        const telephone = req.body.telephone;
        const nombre = req.body.nombre;
        const email = req.body.email;
        const cart = await cartDao.getById(idCart);

        const subjectString = `Nuevo pedido de ${nombre}. Email: ${email}`;
        
        let bodyString = `<h1>Productos</h1><br>`;
        
        if(cart.productos.length > 0) {
            for (let i = 0; i < cart.productos.length; i++) {
                bodyString += `<p>Nombre: ${cart.productos[i].nombre}<br>Precio: ${cart.productos[i].precio}</p><br><br>`
            }
        }
        
        sendEmail(bodyString, subjectString, email);
        sendSMS(telephone);
        sendWhatsApp(telephone, nombre, email);
        res.status(200).send({ result : "SUCCESS"});
    }
    catch (err) {
        logger.error('Hubo un error al hacer el checkout.');
        res.status(400).send({result: "ERROR", message: 'Hubo un error al hacer el checkout.' });
    }

});

export default router;