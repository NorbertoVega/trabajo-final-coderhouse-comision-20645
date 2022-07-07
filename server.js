import server from './src/app.js';
import config from './config.js';
import cluster from 'cluster';
import os from 'os';
import logger from './src/logger/logger.js';

function createServer() {
    server.listen(config.PORT, () => {
        logger.info(`Listening at port ${config.PORT}`);
    });
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