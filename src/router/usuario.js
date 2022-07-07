import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import passport from 'passport';
import bodyParser from 'body-parser';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import config from '../../config.js';
import UsuariosDaoMongoDB from '../daos/usuarios/UsuariosDaoMongoDB.js';
import logger from '../logger/logger.js';

const LocalStrategy = Strategy;
const router = express();
const usuariosDao = new UsuariosDaoMongoDB(false);

const MongoStore = connectMongo.create({
    mongoUrl: config.MONGO_CONNECTION_STRING,
    ttl: config.MONGO_TTL_SESSIONS
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        logger.info(`Ruta: /api/usuario/login, Method: POST`);
        usuariosDao.getAll().then(async (allUsers) => {
            const usuario = allUsers.find(usuario => usuario.email === username);
            if (!usuario) {
                logger.error('Login: Usuario no existe');
                return done(null, false);
            }
            else {
                const result = await bcrypt.compare(password, usuario.password)
                if (!result) {
                    logger.error('Login: Credenciales incorrectas');
                    return done(null, false);
                } else {
                    logger.info('Login: Usuario autenticado');
                    return done(null, usuario);
                }
            }
        })
    }
));

passport.serializeUser((usuario, done) => {
    done(null, usuario.email);
});

passport.deserializeUser((email, done) => {
    usuariosDao.getAll().then((allUsers) => {
        const usuario = allUsers.find(usuario => usuario.email === email);
        done(null, usuario);
    }
    );
});

export function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.send({ result: 'ERROR', message: 'El usuario no está autenticado.' });
    }
}

router.use(cookieParser());
router.use(session({
    store: MongoStore,
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: config.COOKIE_MAX_AGE
    }
}));

router.use(passport.initialize());
router.use(passport.session());

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.get('/loginsuccess', (req, res) => {
    logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/usuario${req.url}, Method: ${req.method}`);
    res.send({ result: "SUCCESS", message: "Usuario autenticado." })
});

router.get('/loginerror', (req, res) => {
    logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/usuario${req.url}, Method: ${req.method}`);
    res.send({ result: "ERROR", message: "No se pudo autenticar usuario." })
});

router.post('/login', passport.authenticate('local', { successRedirect: '/api/usuario/loginsuccess', failureRedirect: '/api/usuario/loginerror' }));

router.post('/registro', async (req, res) => {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/usuario${req.url}, Method: ${req.method}`);
        const { email, password, nombre, direccion, edad, telefono, urlAvatarImage } = req.body;
        const allUsers = await usuariosDao.getAll();
        const usuario = allUsers.find(user => user.email === email);
        if (usuario) {
            res.send({ result: 'ERROR', message: "El usuario ya exite." });
        }
        else {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            if (!hashedPassword)
                res.send({ result: 'ERROR', message: 'Error al generar registro. Hubo un problema al hashear la password.' });
            else {
                usuariosDao.save({ email, password: hashedPassword, nombre, direccion, edad, telefono, urlAvatarImage })
                res.send({ result: 'SUCCESS', message: 'Usuario registrado correctamente.' });
            }
        }
    }
    catch (err) {
        logger.error(`Registro: Error al registrar usuario. Error: ${err}`);
        res.send({ result: 'ERROR', message: `Registro: Error al registrar usuario. Error: ${err}` });
    }

});

router.get('/logout', (req, res) => {
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
});

router.get('/sessionstatus', isAuth, (req, res) => {
    try {
        logger.info(`Ruta: ${req.protocol}://${req.get('host')}/api/usuario${req.url}, Method: ${req.method}`);
        res.send({ result: 'SUCCESS', message: `Usuario autenticado actualmente: ${req.user.email}` });
    }
    catch (err) {
        logger.error(`Sessionstatus: Error al obtener el status de autenticación. Error: ${err}`);
        res.send({ result: 'ERROR', message: `Sessionstatus: Error al obtener el status de autenticación. Error: ${err}` });
    }
});

export default router;