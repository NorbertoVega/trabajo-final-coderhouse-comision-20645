import server from './src/app.js';
import config from './config.js';
import cluster from 'cluster';
import os from 'os';

function createServer() {
    server.listen(config.PORT, () => {
        console.log(`Listening at port ${config.PORT}`);
    });
}

const numCpus = os.cpus().length;
const modo = config.MODO;
console.log('Modo:', modo);

if (modo === 'FORK')
    createServer();

else if (modo === 'CLUSTER') {
    if (cluster.isMaster) {
        console.log(`Master process ${process.pid}`);
        for (let i = 0; i < numCpus; i++) {
            cluster.fork();
        }
        cluster.on("listening", (worker, address) => {
            console.log(`${worker.process.pid} is listening at port ${address.port}`);
        })
    }
    else {
        createServer();
        console.log(`worker ${process.pid} started`);
    }
}