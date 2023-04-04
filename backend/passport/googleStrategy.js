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
      passReqToCallback: true
   },
   async (req, accessToken, refreshToken, profile, done) => {
      try {
         const exUser = await userRepository.findUser(profile.id);
         if (exUser) {
            return done(null, exUser);
         } else {
            req.flash('googleID', profile.id);
            return done(null, false);
         }
      } catch (error) {
         return done(error);
      }
   },
);
