import twilio from 'twilio';
import config from '../../config.js';
import logger from '../logger/logger.js';

const client = new twilio(config.ACCOUNT_SID_TWILIO, config.AUTH_TOKEN_TWILIO);

export async function sendWhatsApp(userTelephoneNumber, nombre, email) {
    client.messages
    .create({
        body: `Nuevo pedido de ${nombre}, con email: ${email}`,
        mediaUrl: [],
        from: `whatsapp:${config.WHATSAPP_ADMIN_TELEPHONE_NUMBER}`,
        to: `whatsapp:+549${userTelephoneNumber}`
    })
    .then(message => logger.info(`Whatsapp enviado correctamente. Id mensaje: ${message.sid}`))
    .done();
}