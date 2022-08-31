import logger from '../utils/logger/logger.js';
import { getAllMessages, saveMessage } from '../services/message.service.js';
import { getUserByEmail } from '../services/user.service.js';
import { MessageDTO } from '../dto/message.dto.js';

export function socketEventHandler(socket, io) {
    logger.info(`Connected to socket`);

    socket.on('render-all-messages', async () => {
        logger.info(`Websocket: add-new-message`);
        const messages = await getAllMessages();
        io.sockets.emit('render-messages', JSON.parse(JSON.stringify(messages)));
    });

    socket.on('add-new-message', async data => {
        logger.info(`Websocket: add-new-message`);
        const user = await getUserByEmail(data.email);
        if (user === null) {
            logger.warn(`Websocket: add-new-message: Usuario no existe`);
            return;
        }
        else {
            await saveMessage(new MessageDTO(data.email, data.text));
            const messages = await getAllMessages();
            io.sockets.emit('render-messages', JSON.parse(JSON.stringify(messages)));
        }
    });

}    