import express from 'express';
import passport from 'passport';

import * as authController from '../controller/auth.js';

import { isAuth } from '../middleware/auth.js';
import { usernameRules, validate } from '../middleware/validate.js';

const router = express.Router();

router.get('/login/google', passport.authenticate('googleLogin', { scope: ['profile'] }));
router.get('/signup/google', authController.signupRedirect);
router.post('/signup/google', usernameRules(), validate, authController.signup);
router.get('/login/google/callback', passport.authenticate('googleLogin', { failureRedirect: '/auth/signup/google' }), authController.googleCallback);
router.put('google/update/verified', authController.verifiedUpdate);
router.put('/google/update', isAuth, usernameRules(), authController.userUpdate);
router.get('/avatar', isAuth, authController.getAvatar);
router.get('/logout', authController.logout);

export default router;
