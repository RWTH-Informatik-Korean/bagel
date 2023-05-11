import express from 'express';

import * as verificationController from '../controller/verification.js'

import { emailRules, validate } from '../middleware/validate.js';

const router = express.Router();

router.post('/send', emailRules(), validate, verificationController.sendVerifiCode);
router.post('/check', verificationController.checkVerifiCode);

export default router;
