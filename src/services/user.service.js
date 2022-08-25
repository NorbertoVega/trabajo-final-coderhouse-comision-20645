import bcrypt from 'bcrypt';
import UserRepository from "../db/repository/user.repository.js";
import config from '../../config.js';
import { sendEmail } from '../utils/mailSender.js';

export const userRepository = new UserRepository();

export async function getAllUsers() {
    return await userRepository.getAll();
}

export async function saveUser(user) {
    return await userRepository.save(user);
}

export async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export async function sendRegisterEmail(nombre, email, direccion) {
    const subjectString = `Nuevo registro`;
    const bodyString = `<p>Nombre: ${nombre}</p><br><p>Email: ${email}</p><br><P>Dirección: ${direccion}</P>`;
    sendEmail(bodyString, subjectString, config.ADMIN_EMAIL);
}

export async function getUserByEmail(email) {
    const user = await userRepository.getByEmail(email);
    return user;
}

export async function isAdmin(email) {
    const user = await userRepository.getByEmail(email);
    if (user === null || user.admin === null || user.admin == undefined)
        return false;
    return user.admin;
}

export async function updateUser(email, user) {
    return await userRepository.updateByEmail(email, user);
}
