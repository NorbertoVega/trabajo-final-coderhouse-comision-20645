
export function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.send({ result: 'ERROR', message: 'El usuario no está autenticado.' });
    }
}