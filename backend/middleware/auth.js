export const isAuth = (req, res, next) => {
  // !!! frontend test를 위해서 임으로 코드 수정. 로그인 완료 후에는 아래 코드로 돌려놓아야 함.
  return next();
  // if (req.isAuthenticated()) {
  //   return next();
  // } else {
  //   return res.status(403).json({ message: 'user is not authenticated' })
  // }
};
