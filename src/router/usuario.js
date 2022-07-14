import express from 'express';
import passport from 'passport';
import { isAuth } from '../middleware/auth.js';
import { 
    loginSuccesController,
    loginErrorController,
    registrarUsuarioController,
    logoutController,
    sessionStatusController } from '../controller/usuario.controller.js';

const router = express();

router.get('/loginsuccess', loginSuccesController);
router.get('/loginerror', loginErrorController);
router.post('/login', passport.authenticate('local', { successRedirect: '/api/usuario/loginsuccess', failureRedirect: '/api/usuario/loginerror' }));
router.post('/registro', registrarUsuarioController);
router.get('/logout', isAuth, logoutController);
router.get('/sessionstatus', isAuth, sessionStatusController);

export default router;

