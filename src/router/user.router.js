import express from 'express';
import passport from 'passport';
import { isAuth } from '../middleware/auth.js';
import {
    loginSucces,
    loginError,
    registerUser,
    logout,
    sessionStatus,
    convertUserToAdmin
} from '../controller/user.controller.js';

const router = express();

router.get('/loginsuccess', loginSucces);
router.get('/loginerror', loginError);
router.post('/login', passport.authenticate('local', { successRedirect: '/api/usuario/loginsuccess', failureRedirect: '/api/usuario/loginerror' }));
router.post('/registro', registerUser);
router.post('/logout', isAuth, logout);
router.get('/sessionstatus', isAuth, sessionStatus);
router.post('/convertUserToAdmin', isAuth, convertUserToAdmin);

export default router;

