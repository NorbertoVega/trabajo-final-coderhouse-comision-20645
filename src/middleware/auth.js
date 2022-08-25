import config from "../../config.js";
import logger from "../utils/logger/logger.js";

export function isAuth(req, res, next) {
    if (config.TEST || req.isAuthenticated()) {
        if (config.TEST)
            logger.info("Acceso permitido: modo test");
        next();
    }
    else {
        res.status(401).send({ result: 'ERROR', message: 'Usuario no autenticado.' });
    }
}