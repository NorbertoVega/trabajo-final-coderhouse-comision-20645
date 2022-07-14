import bcrypt from 'bcrypt';
import UsuariosDaoMongoDB from "../daos/usuarios/UsuariosDaoMongoDB.js";
import config from '../../config.js';
import { sendEmail } from '../utils/mailSender.js';

export const usuariosDao = new UsuariosDaoMongoDB();

export async function getAllUsersService() {
    return await usuariosDao.getAll();
}

export async function agregarUsuarioService(user) {
    return await usuariosDao.save(user);
}

export async function hashPasswordService(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export async function enviarEmailDeRegistroService(nombre, email, direccion) {
    const subjectString = `Nuevo registro`;
    const bodyString = `<p>Nombre: ${nombre}</p><br><p>Email: ${email}</p><br><P>Dirección: ${direccion}</P>`;
    sendEmail(bodyString, subjectString, config.ADMIN_EMAIL);
}