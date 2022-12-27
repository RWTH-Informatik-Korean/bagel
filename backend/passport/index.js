import passport from 'passport';

import google  from './googleStrategy.js';

import User from '../database/user.js';

module.exports = () => {

   passport.serializeUser((user, done) => {
      done(null, user.id);
   });

   passport.deserializeUser((id, done) => {
      User.findOne({ where: { id } })
         .then(user => done(null, user))
         .catch(err => done(err));
   }); 
   google(); // 구글 전략 등록
};
