import mongoose from 'mongoose';

const usuariosCollection = 'usuarios';

const usuariosSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    edad: { type: Number, required: true },
    telefono: { type: Number, required: true },
    urlAvatarImage: { type: String }
});

export const UsuarioModel = mongoose.model(usuariosCollection, usuariosSchema);

