import logger from "../logger/logger.js";
import { 
    getAllUsersService,
    agregarUsuarioService,
    hashPasswordService,
    enviarEmailDeRegistroService } from "../services/usuario.service.js";

export async function loginSuccesController(req, res) {
    logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/usuario${req.url}, Method: ${req.method}`);
    res.send({ result: "SUCCESS", message: "Usuario autenticado." })
}

export async function loginErrorController(req, res) {
    logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/usuario${req.url}, Method: ${req.method}`);
    res.send({ result: "ERROR", message: "No se pudo autenticar usuario." })
}

export async function registrarUsuarioController(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/usuario${req.url}, Method: ${req.method}`);
        const { email, password, nombre, direccion, edad, telefono, urlAvatarImage } = req.body;
        const allUsers = await getAllUsersService();
        const usuario = allUsers.find(user => user.email === email);
        if (usuario) {
            res.send({ result: 'ERROR', message: "El usuario ya exite." });
        }
        else {
            const hashedPassword = await hashPasswordService(password);
            if (!hashedPassword)
                res.send({ result: 'ERROR', message: 'Error al generar registro. Hubo un problema al hashear la password.' });
            else {
                await agregarUsuarioService({ email, password: hashedPassword, nombre, direccion, edad, telefono, urlAvatarImage });
                enviarEmailDeRegistroService(nombre, email, direccion);
                res.send({ result: 'SUCCESS', message: 'Usuario registrado correctamente.' });
            }
        }
    }
    catch (err) {
        logger.error(`Registro: Error al registrar usuario. Error: ${err}`);
        res.send({ result: 'ERROR', message: `Registro: Error al registrar usuario. Error: ${err}` });
    }
}

export async function logoutController(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/usuario${req.url}, Method: ${req.method}`);
              
        req.session.destroy(err => {
            if (!err)
                res.send({ result: 'SUCCESS', message: `El usuario ${req.user.email} se deslogueó correctamente.` });
            else
                res.send({ result: 'ERROR', message: `Logout: Error al desloguearse. Error: ${err}` });
        });
    }
    catch (err) {
        logger.error(`Logout: Error al desloguearse. Error: ${err}`);
        res.send({ result: 'ERROR', message: `Logout: Error al desloguearse. Error: ${err}` });
    }
}

export async function sessionStatusController(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/usuario${req.url}, Method: ${req.method}`);
        res.send({ result: 'SUCCESS', message: `Usuario autenticado actualmente: ${req.user.email}` });
    }
    catch (err) {
        logger.error(`Sessionstatus: Error al obtener el status de autenticación. Error: ${err}`);
        res.send({ result: 'ERROR', message: `Sessionstatus: Error al obtener el status de autenticación. Error: ${err}` });
    }
}
