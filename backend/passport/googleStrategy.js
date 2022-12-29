import passport from 'passport'
import { Strategy } from 'passport-google-oauth20';

import * as User from '../database/user.js';
import { googleConfig  as config } from '../config.js';

export const google = () => {
    passport.use(
    new Strategy(
       {
          clientID: config.id,
          clientSecret: config.secret,
          callbackURL: '/auth/google/callback',
       },
       async (accessToken, refreshToken, profile, done) => {
          try {
             const exUser = await User.findUser(profile.id);
             if (exUser) {
                done(null, exUser);
             } else {
                const newUser = await User.create(
                   profile.displayName,
                   profile.id,
                );
                done(null, newUser);
             }
          } catch (error) {
             console.error(error);
             done(error);
          }
       },
    ),
 );
}; 
