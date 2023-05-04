import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';

import * as userRepository from '../database/user.js';
import { googleConfig as config } from '../config.js';


export default (app) => {
   app.use(passport.initialize());
   app.use(passport.session());

   passport.use('googleLogin', googleLogin);

   passport.serializeUser((user, done) => {
      done(null, { username: user.username, googleID: user.googleID });
   });

   passport.deserializeUser((user, done) => {
      userRepository.findUser(user.googleID)
         .then(user => done(null, user))
         .catch(err => done(err));
   });
}

const googleLogin = new Strategy(
   {
      clientID: config.id,
      clientSecret: config.secret,
      callbackURL: '/auth/login/google/callback',
      passReqToCallback: true,
      withCredentials: true,
   },
   async (req, accessToken, refreshToken, profile, done) => {
    try {
      const exUser = await userRepository.findUser(profile.id);

      // IF: existing user && rwthVerified -> log in
      if (exUser && exUser.rwthVerified) {
      console.log('user is:', exUser);
      return done(null, exUser);
      } 

      // IF: new user -> sign up + log in
      else { 
        console.log(profile);
        // 구글 profile 정보에서 parameters 가져옴 - username, googleIDm, avatarUrl 초기화 + (rwthVerified: false)
        userRepository.create(profile.displayName, profile.id, profile._json.picture, false)
        .then((newUser) => {
          // TODO: console.log 지울것
          // console.log('created new user: ', newUser);
          return newUser.save();
        })
        .then((savedUser) => {
          return done(null, savedUser);
        })
        .catch((error) => {
          return done(error);
        });
      }
    } 

    catch (error) {
        return done(error);
    }
   }
);
