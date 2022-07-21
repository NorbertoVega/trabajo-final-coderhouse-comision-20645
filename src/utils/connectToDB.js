import mongoose from 'mongoose';
import config from '../../config.js';
import logger from '../logger/logger.js';

function connectToMongoDB() {
    mongoose.connect(config.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    logger.info(`Conectado a MongoDb`);
}

export function initializePersistence() {
    switch (config.PERSISTENCE) {
        case 'MEMORIA':
            logger.info(`Persistencia en memoria`);
            break;
        case 'ARCHIVO':
            logger.info(`Persistencia en archivo`);
            break;
        default:
            connectToMongoDB();
    }
}