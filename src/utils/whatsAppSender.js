import twilio from 'twilio';
import config from '../../config.js';

const client = new twilio(config.ACCOUNT_SID_TWILIO, config.AUTH_TOKEN_TWILIO);

export async function sendWhatsApp(userTelephoneNumber, nombre, email) {
    client.messages
    .create({
        body: `Nuevo pedido de ${nombre}, con email: ${email}`,
        mediaUrl: [],
        from: `whatsapp:${config.WHATSAPP_ADMIN_TELEPHONE_NUMBER}`,
        to: `whatsapp:+549${userTelephoneNumber}`
    })
    .then(message => console.log(message.sid))
    .done();
}