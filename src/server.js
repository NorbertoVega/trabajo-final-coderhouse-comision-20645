import express from 'express';
import cluster from 'cluster';
import router from './router/index.js';
import config from '../config.js';
import os from 'os';
import logger from './logger/logger.js';

const app = express();

app.use('/api', router);
app.use(express.urlencoded({ extended: true }));

function createServer() {
    app.listen(config.PORT, () => {
        logger.info(`Listening at port ${config.PORT}`);
    });

    app.on("error", (error) => logger.error(`Error en servidor`, error));
}

const numCpus = os.cpus().length;
const modo = config.MODO;
logger.info(`modo: ${modo}`);

if (modo === 'FORK')
    createServer();

else if (modo === 'CLUSTER') {
    if (cluster.isMaster) {
        logger.info(`Master process ${process.pid}`);
        for (let i = 0; i < numCpus; i++) {
            cluster.fork();
        }
        cluster.on("listening", (worker, address) => {
            logger.info(`${worker.process.pid} is listening at port ${address.port}`);
        })
    }
    else {
        createServer();
        logger.info(`worker ${process.pid} started`);
    }
}