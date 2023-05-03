import express from 'express';
import passport from 'passport';
import * as userRepository from '../database/user.js'
import { isAuth } from '../middleware/auth.js';
import { usernameRules } from '../middleware/validate.js';

const router = express.Router();

router.get('/login/google', passport.authenticate('googleLogin', { scope: ['profile'] }));

router.get('/signup/google', (req, res) => {
   const googleID = req.flash('googleID');
 
   if(googleID == undefined) {
     res.redirect('/auth/login/google')
   } else {
     res.status(200).json(googleID)
   }
 });

router.post('/signup/google', usernameRules(), async (req, res) => {
   const { username, googleID, avataUrl } = req.body;

   if (googleID == 'undefined') {
      res.status(404).json({ message: 'no googleID' });
   } else {
      if (!await userRepository.findUsername(username)) {
         res.status(404).json({ message: 'username이 존재합니다.' });
       }
      const newUser = await userRepository.create(username, googleID, avataUrl);
      if (newUser) {
         req.session.passport = { user: googleID, username: username };
         res.status(200).json(req.session);
      } else {
         res.status(404).json({ message: 'signup failed' });
      }
   }
});

router.get('/login/google/callback',
   passport.authenticate('googleLogin', { failureRedirect: '/auth/signup/google' }),
   (req, res) => {
      if (req.sessionID) {
         res.status(200).json(req.session);
      } else {
         res.status(404).json({ message: 'login failed'});
      }
   },
);

router.put('/google/update', usernameRules(), isAuth, async (req, res) => {
   const { googleID, username, avataUrl } = req.body;
   if(googleID == req.user.googleID){
      if (username && !(await userRepository.findUsername(username))) {
         res.status(404).json({ message: 'username이 존재합니다.' });
       }
       
      const update = await userRepository.update(googleID, username, avataUrl);
      if (update) {
         res.status(200).json(update);
      } else {
         res.status(404).json({ message: 'user not found' });
      }
   } else {
      res.status(404).json({ message: 'user not found'});
   }
});


router.get('/logout', (req, res) => {
   req.session.destroy((err) => {
      res.status(200).redirect('/');
   });
});

export default router;
