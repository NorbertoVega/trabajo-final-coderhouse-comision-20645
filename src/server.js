import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import router from './router/index.js';
import config from '../config.js';
import logger from './utils/logger/logger.js';
import { socketEventHandler } from './socket/socket.handler.js';
import cors from 'cors';

const app = express();
const httpServer = createServer(app); 
const io = new Server(httpServer);

app.use(cors({ origin: "*" }));
app.use('/api', router);
app.use(express.urlencoded({ extended: true }));

io.on('connection', (socket) => {
    socketEventHandler(socket, io);
});

httpServer.listen(config.PORT, () => {
    logger.info(`Listening at port ${config.PORT}`);
});

app.on("error", (error) => logger.error(`Error en servidor`, error));
