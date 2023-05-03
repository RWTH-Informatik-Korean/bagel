import express from 'express';
import passport from 'passport';
import * as userRepository from '../database/user.js'
import { isAuth } from '../middleware/auth.js';
import { usernameRules, validate } from '../middleware/validate.js';

const router = express.Router();

// google login (Google OAuth2)
router.get('/login/google', 
  passport.authenticate('googleLogin', { scope: ['profile'] }));

router.get('/signup/google', (req, res) => {
   const googleID = req.flash('googleID');
 
   if(googleID == undefined) {
     res.redirect('/auth/login/google')
   } else {
     res.status(200).json(googleID)
   }
 });

 // Bagel 회원가입
/**
 *  (after google login)
 *  signup user for bagel
 *  @param - googleID, username, avatarUrl
 */
router.post('/signup/google', usernameRules(), validate, async (req, res) => {
  // const profile = JSON.parse(req.query.profile);
  // console.log('받아온 정보: ', profile.googleID);
  console.log('받음');
   const { username, googleID, avatarUrl } = req.body;

   if (googleID == 'undefined') {
      res.status(404).json({ message: 'no googleID' });
   } else {
      if (await userRepository.findUsername(username)) {
         res.status(404).json({ message: 'username이 존재합니다.' });
       } else {
         const newUser = await userRepository.create(username, googleID, avatarUrl);
         if (newUser) {
            req.session.passport = { user: googleID, username: username };
            res.status(200).json(req.session);
         } else {
            res.status(404).json({ message: '새로운 유저를 만들지 못했습니다.' });
         }
       }
   }
});

router.get('/login/google/callback',
   passport.authenticate('googleLogin', { failureRedirect: '/auth/signup/google' }),
   async (req, res) => {
      if (req.sessionID) {
        //  res.status(200).json(req.session);
        console.log(req.session.passport.user);
        res.status(200);

        const userPassport = await req.session.passport.user;
        // const userPassportJson = JSON.stringify(userPassport);

        const user = await userRepository.findUser(userPassport.googleID);

        if (!user.rwthVerified) {
          // TODO: 수정할 것 - paramteter가 주소에 노출되는 보안 문제 - 다른 방법을 찾아야 함!!!
          return res.redirect(`http://localhost:4200/signup/?googleID=${userPassport.googleID}`);
          // return res.redirect(`/auth/login/google/verification?googleID=${userPassport.googleID}`);
        } 
        return res.redirect(`http://localhost:4200/?username=${userPassport.username}&googleID=${userPassport.googleID}`);
        
      } else {
         return res.status(404).json({ message: 'login failed'});
      }
   },
);

router.put('google/update/verified', async (req, res) => {
   const rwthVerified = req.body;
   const update = await userRepository.updateVerfied(rwthVerified);
   if (update) {
     res.status(200);
   } else {
     res.status(404).json({ message: 'user not found' });
   }
 });
 
router.put('/google/update', isAuth, usernameRules(), validate, async (req, res) => {
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
