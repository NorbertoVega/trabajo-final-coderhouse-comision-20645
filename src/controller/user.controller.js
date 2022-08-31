import logger from "../utils/logger/logger.js";
import {
    getAllUsers,
    saveUser,
    hashPassword,
    sendRegisterEmail,
    getUserByEmail,
    updateUser
} from "../services/user.service.js";
import { UserDTO } from "../dto/user.dto.js";

export async function loginSucces(req, res) {
    logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/usuario${req.url}, Method: ${req.method}`);
    res.send({ result: "SUCCESS", message: "Usuario autenticado." })
}

export async function loginError(req, res) {
    logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/usuario${req.url}, Method: ${req.method}`);
    res.send({ result: "ERROR", message: "No se pudo autenticar usuario." })
}

export async function registerUser(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/usuario${req.url}, Method: ${req.method}`);
        const { email, password, name, lastName, address, age, phoneNumber, urlAvatarImage } = req.body;
        const allUsers = await getAllUsers();
        const usuario = allUsers.find(user => user.email === email);
        if (usuario) {
            res.send({ result: 'ERROR', message: "El usuario ya exite." });
        }
        else {
            const hashedPassword = await hashPassword(password);
            if (!hashedPassword)
                res.send({ result: 'ERROR', message: 'Error al generar registro. Hubo un problema al hashear la password.' });
            else {
                const user = new UserDTO(email, hashedPassword, name, lastName, address, age, phoneNumber, urlAvatarImage)
                await saveUser(user);
                sendRegisterEmail(name, lastName, email, address);
                res.send({ result: 'SUCCESS', message: 'Usuario registrado correctamente.' });
            }
        }
    }
    catch (err) {
        logger.error(`Registro: Error al registrar usuario. Error: ${err}`);
        res.send({ result: 'ERROR', message: `Registro: Error al registrar usuario. Error: ${err}` });
    }
}

export async function logout(req, res) {
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

export async function sessionStatus(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/usuario${req.url}, Method: ${req.method}`);
        res.send({ result: 'SUCCESS', message: `Usuario autenticado actualmente: ${req.user.email}` });
    }
    catch (err) {
        logger.error(`Sessionstatus: Error al obtener el status de autenticación. Error: ${err}`);
        res.send({ result: 'ERROR', message: `Sessionstatus: Error al obtener el status de autenticación. Error: ${err}` });
    }
}

export async function convertUserToAdmin(req, res) {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/usuario${req.url}, Method: ${req.method}`);
        const email = req.body.email;
        const user = await getUserByEmail(email);
        user.admin = true;
        const idUpdated = await updateUser(email, user);
        res.send({ result: 'SUCCESS', message: `Usuario ${req.user.email} ahora es Admin.` });
    }
    catch (err) {
        logger.error(`Sessionstatus: Error al obtener el status de autenticación. Error: ${err}`);
        res.send({ result: 'ERROR', message: `Sessionstatus: Error al obtener el status de autenticación. Error: ${err}` });
    }
}