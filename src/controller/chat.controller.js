import logger from '../utils/logger/logger.js';
import { getMessagesByEmailSrv } from '../services/message.service.js';

export async function renderMessages(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/chats${req.url}, Method: ${req.method}`);
        res.render('messages');
    }
    catch (err) {
        logger.error(`Error al otener la plantilla messages: ${err}`);
        res.status(500);
    }
}

export async function renderUserMessages(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/chats${req.url}, Method: ${req.method}`);
        const messagesByEmail = await getMessagesByEmailSrv(req.params.email);
        res.status(200).send({ messagesByEmail });
    }
    catch (err) {
        logger.error(`Error al otener los messages: ${err}`);
        res.status(500);
    }
}