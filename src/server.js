import express from 'express';
import cluster from 'cluster';
import router from './router/index.js';
import config from '../config.js';
import logger from './utils/logger/logger.js';

const app = express();

app.use('/api', router);
app.use(express.urlencoded({ extended: true }));

app.listen(config.PORT, () => {
    logger.info(`Listening at port ${config.PORT}`);
});

app.on("error", (error) => logger.error(`Error en servidor`, error));


