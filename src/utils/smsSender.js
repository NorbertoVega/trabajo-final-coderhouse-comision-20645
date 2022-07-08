import twilio from 'twilio';
import config from '../../config.js';
import logger from '../logger/logger.js';

const client = twilio(config.ACCOUNT_SID_TWILIO, config.AUTH_TOKEN_TWILIO);

export async function sendSMS(clientTelephone) {
   try {
      const message = await client.messages.create({
         body: 'Su pedido ha sido recibido y se encuentra en proceso.',
         from: config.TWILIO_TELEPHONE_NUMBER,
         to: `+54${clientTelephone.toString()}`
      })
      logger.info(JSON.stringify(message));
   } catch (error) {
      logger.error(`Hubo un error al enviar SMS. Error: ${error}`);
   }
}