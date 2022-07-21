import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import { Strategy } from 'passport-local';
import { getAllUsersService } from '../services/usuario.service.js'
import config from '../../config.js';
import passport from 'passport';
import bcrypt from 'bcrypt';
import logger from '../logger/logger.js';

export function initializePassport(router) {

    if (config.PERSISTENCE == 'MEMORIA' || config.PERSISTENCE == 'ARCHIVO')
        return;

    const LocalStrategy = Strategy;

    const MongoStore = connectMongo.create({
        mongoUrl: config.MONGO_CONNECTION_STRING,
        ttl: config.MONGO_TTL_SESSIONS
    });

    passport.use(new LocalStrategy(
        function (username, password, done) {
            logger.info(`Ruta: /api/usuario/login, Method: POST`);
            getAllUsersService().then(async (allUsers) => {
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
        getAllUsersService().then((allUsers) => {
            const usuario = allUsers.find(usuario => usuario.email === email);
            done(null, usuario);
        }
        );
    });

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
}