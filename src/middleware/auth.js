import config from "../../config.js";

export function isAuth(req, res, next) {
    if (config.PERSISTENCE == 'MEMORIA' || config.PERSISTENCE == 'ARCHIVO' || req.isAuthenticated()) {
        next();
    }
    else {
        res.send({ result: 'ERROR', message: 'El usuario no está autenticado.' });
    }
}