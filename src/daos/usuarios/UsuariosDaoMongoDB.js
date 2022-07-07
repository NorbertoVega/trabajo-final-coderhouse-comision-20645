import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js';
import { UsuarioModel } from '../../contenedores/mongooseModels/UsuarioModel.js';

class UsuariosDaoMongoDB extends ContenedorMongoDB {

    constructor(isInitialized) {
        super(UsuarioModel, isInitialized);
    }
}

export default UsuariosDaoMongoDB;