import { body, validationResult } from 'express-validator';

export function validate(req, res, next) {
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({ message: error.array() });
  } else {
    next();
  }
}

export const emailRules = () => {
  return body('email')
  .isEmail({ host_whitelist: 'rwth-aachen.de' })
  .withMessage('올바른 이메일 주소를 입력해주세요.');
}

export const usernameRules = () => {
  return body('username')
  .if((value, { req }) => req.body.username).notEmpty()
  .trim()
  .isLength({ min:2, max:8 })
  .withMessage('username의 길이는 2자 미만 이거나 8자 이상 입니다.');
}
