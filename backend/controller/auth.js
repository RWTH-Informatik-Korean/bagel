import passport from 'passport';
import * as userRepository from '../database/user.js'

export function login() {
  console.log('a')
  passport.authenticate('googleLogin', { scope: ['profile'] });
}

export function signupRedirect(req, res) {
  const googleID = req.flash('googleID');

  if (googleID == undefined) {
    res.redirect('/auth/login/google')
  } else {
    res.status(200).json(googleID)
  }
}

export async function signup(req, res) {
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
}

export async function googleCallback(req, res) {
  if (req.sessionID) {
    res.status(200);
    const userPassport = await req.session.passport.user;
    const user = await userRepository.findUser(userPassport.googleID);
    // rwth email 미인증 user -> email 인증 페이지로 이동
    if (!user.rwthVerified) {
      res.cookie("googleLoggedIn", 'true');
      res.cookie("_id", user.id.toString());
      res.cookie("username", user.username);
      res.cookie("avatarUrl", user.avatarUrl);
      return res.redirect(`http://localhost:4200/login`);
    }
    // 가입 완료된 user -> 로그인 완료 후 main 페이지로 이동
    res.cookie("_id", user._id.toString());
    res.cookie("username", user.username);
    res.cookie("avatarUrl", user.avatarUrl);
    res.cookie("loggedIn", 'true');
    return res.redirect(`http://localhost:4200/`);

  } else {
    return res.status(404).json({ message: 'login failed' });
  }

}

export function logout(req, res) {
  req.session.destroy((err) => {
    res.status(200).redirect('/');
  });
}

export async function verifiedUpdate(req, res) {
  const rwthVerified = req.body;
  const update = await userRepository.updateVerfied(rwthVerified);
  if (update) {
    res.status(200);
  } else {
    res.status(404).json({ message: 'user not found' });
  }
}

export async function userUpdate(req, res) {
  const { googleID, username, avatarUrl } = req.user;
  if (username && !(await userRepository.findUsername(username))) {
    res.status(404).json({ message: 'username이 존재합니다.' });
  }
  const update = await userRepository.update(googleID, username, avatarUrl);
  if (update) {
    res.status(200).json(update);
  } else {
    res.status(404).json({ message: 'user not found' });
  }
}

export function getAvatar(req, res) {
  const avatarUrl = req.user.avatarUrl;
  res.status(200).json({ avatarUrl });
}
