import logger from '../utils/logger/logger.js';
import config from '../../config.js';

export async function getServerInfo(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/${req.url}, Method: ${req.method}`);
        const serverInfo = {
            port: config.PORT,
            persistence: config.PERSISTENCE,
            dbUrl: config.MONGO_CONNECTION_STRING,
            sessionExpirationInMilis: config.COOKIE_MAX_AGE,
            adminEmail: config.ADMIN_EMAIL,
            adminEmailPass: config.ADMIN_EMAIL_PASS,
            pathEjec: process.argv[0],
            os: process.platform,
            processId: process.pid,
            nodeVersion: process.version,
            carpetaProy: process.argv[1],
            memoryUse: process.memoryUsage().rss
        }
        res.status(200).send(serverInfo);
    }
    catch(err) {
        logger.error(`Error al otener todos los productos: ${err}`);
        res.status(500);
    }
}
