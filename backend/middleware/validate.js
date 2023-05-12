import { body, validationResult } from 'express-validator';

export function validate(req, res, next) {
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({ message: error.errors[0].msg });
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
  .withMessage('username의 길이는 2~8자만 가능합니다.');
}
