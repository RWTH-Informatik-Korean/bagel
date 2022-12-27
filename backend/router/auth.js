import express from 'express';
import 'express-async-errors';
import passport from 'passport';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
 
router.get(
   '/google/callback',
   passport.authenticate('google', { failureRedirect: '/' }),
   (req, res) => {
      res.redirect('/');
   },
);

router.get('/logout', (req, res) => {
   req.session.destroy( (err) => {
     res.redirect('/');
   });
 });

export default router;
