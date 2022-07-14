import mongoose from 'mongoose';
import config from '../../config.js';
import logger from '../logger/logger.js';

export function connectToMongoDB() {
    mongoose.connect(config.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    logger.info(`Conectado a MongoDb`);  
}