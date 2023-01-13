import nodemailer from 'nodemailer';

import * as verifiRepository from '../database/verification.js';
import { nodemailerConfig as config } from '../config.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  post: 587,
  secure: false,
  auth: {
    user: config.user,
    pass: config.pass
  },
});

export async function send(email) {
  const checkDuplicated = await checkEmailDuplication(email);
  if (checkDuplicated) {
    if (checkDuplicated.verified) {
      return 0;
    } else {
      return 2
    }
  } else {
    const verifiCode = Math.random().toString(36).slice(2);

    verifiCodeSave(email, verifiCode);
    await transporter.sendMail(emailForm(email, verifiCode));
    transporter.close();
    return 1;
  }
}

export async function checkVerifiCode(email, verifiCode) {
  const verification = await verifiRepository.get(email);

  if (verification == null) {
    return 3;
  } else if (verification.verified == true) {
    return 2;
  } else {
    if (verification.verificationCode == verifiCode) {
      await verifiRepository.verified(email);
      return 1;
    } else {
      return 0;
    }
  }
}

async function checkEmailDuplication(email) {
  return await verifiRepository.get(email);
}

function verifiCodeSave(email, verifiCode) {
  verifiRepository.create(email, verifiCode);
  setTimeout(() => isVerified(email), 60 * 1000);
}

async function isVerified(email) {
  const verification = await verifiRepository.get(email);

  if (!verification.verified) {
    await verifiRepository.remove(verification.id);
  }
}

function emailForm(email, verifiCode) {
  return {
    from: 'Bagel <bagel.rwth@gmail.com>',
    to: email,
    subject: '인증코드',
    text: verifiCode
  };
}
