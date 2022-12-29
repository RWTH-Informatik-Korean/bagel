import express from 'express';
import passport from 'passport';
import * as userRepository from '../database/user.js'

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
 
router.get(
   '/google/callback',
   passport.authenticate('google', { failureRedirect: '/' }),
   (req, res) => {
      res.status(200).redirect('/');
   },
);
router.put('/google/update', async (req, res) => {
   const { googleID, username, avataUrl } = req.body;
   const update = await userRepository.update(googleID, username, avataUrl);
   if (update) {
      res.status(200).json(update);
   } else {
      res.status(404).json({ message: 'user not found' });
   }
   res.status(200);
});


router.get('/logout', (req, res) => {
   req.session.destroy( (err) => {
      res.status(200).redirect('/');
   });
 });

export default router;
