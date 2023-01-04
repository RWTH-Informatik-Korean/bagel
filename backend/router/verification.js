import express from 'express';

import * as verifiEmail from '../verification/verification.js';

const router = express.Router();

router.post('/send', async (req, res) => {
  const email = req.body.email;
  const result = await verifiEmail.send(email);

  if (result == 1) {
    res.status(200).json({ message: `${email}으로 인증번호를 전송 하였습니다.` });
  } else if (result == 2) {
    res.status(404).json({ message: '이미 요청된 이메일 입니다. 이메일을 확인 해주세요.' })
  } else {
    res.status(404).json({ message: '이미 인증된 이메일 입니다.' })
  }
});

router.post('/check', async (req, res) => {
  const { email, verifiCode } = req.body;
  const result = await verifiEmail.checkVerifiCode(email, verifiCode);

  if (result == '1') {
    res.status(200).json({ message: '인증에 성공 했습니다.' });
  } else if (result == '2') {
    res.status(404).json({ message: '이미 인증된 이메일 입니다.' });
  } else if (result == '3') {
    res.status(404).json({ message: '인증 요청이 없었던 이메일 이거나 인증시간이 지났습니다 다시 이메일 인증을 시도 해주세요.' });
  } else {
    res.status(404).json({ message: '코드가 일치 하지 않습니다.' });
  }
})
export default router;
