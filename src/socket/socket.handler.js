import logger from '../utils/logger/logger.js';

export function socketEventHandler(socket, io) {
    logger.info(`Connected to socket`);

    socket.on('render-all-messages', data => {
        logger.info(`Websocket: add-new-message`);
        //io.sockets.emit('render-messages', JSON.parse(JSON.stringify()));
    });
    
    socket.on('render-user-messages', data => {
        logger.info(`Websocket: render-user-messages`);
        //io.sockets.emit('render-messages', JSON.parse(JSON.stringify()));       
    });

    socket.on('add-new-message', data => {
        logger.info(`Websocket: add-new-message`);
        console.log({data});
    });

}