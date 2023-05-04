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

// google OAuth2 callback function
router.get('/login/google/callback',
   passport.authenticate('googleLogin', { failureRedirect: '/auth/signup/google' }),
   async (req, res) => {
      if (req.sessionID) {
        res.status(200);
        const userPassport = await req.session.passport.user;
        const user = await userRepository.findUser(userPassport.googleID);
        // rwth email 미인증 user -> email 인증 페이지로 이동
        if (!user.rwthVerified) {
          res.cookie("googleID", userPassport.googleID);
          res.cookie("avatarUrl", user.avatarUrl);
          return res.redirect(`http://localhost:4200/login`);
        }
        // 가입 완료된 user -> 로그인 완료 후 main 페이지로 이동
        res.cookie("googleID", userPassport.googleID);
        res.cookie("avatarUrl", user.avatarUrl);
        res.cookie("loggedIn", 'true');
        return res.redirect(`http://localhost:4200/`);
        
      } else {
         return res.status(404).json({ message: 'login failed' });
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
   const { googleID, username, avatarUrl } = req.body;
   if(googleID == req.user.googleID){
      if (username && !(await userRepository.findUsername(username))) {
         res.status(404).json({ message: 'username이 존재합니다.' });
       }
      const update = await userRepository.update(googleID, username, avatarUrl);
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
