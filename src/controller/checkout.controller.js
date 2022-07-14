import logger from '../logger/logger.js';
import { sendSMS } from '../utils/smsSender.js';
import { sendWhatsApp } from '../utils/whatsAppSender.js';
import { getCarritoByIdService } from '../services/carrito.service.js';
import { sendCheckoutEmail } from '../services/checkout.service.js';

export async function checkout(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/checkout${req.url}, Method: ${req.method}`);
        const idCart = req.params.id_cart;
        const telephone = req.body.telephone;
        const nombre = req.body.nombre;
        const email = req.body.email;
        const cart = await getCarritoByIdService(idCart);

        sendCheckoutEmail(email, nombre, cart)        
        sendSMS(telephone);
        sendWhatsApp(telephone, nombre, email);
        res.status(200).send({ result : "SUCCESS"});
    }
    catch (err) {
        logger.error('Hubo un error al hacer el checkout.');
        res.status(400).send({result: "ERROR", message: 'Hubo un error al hacer el checkout.' });
    }
}