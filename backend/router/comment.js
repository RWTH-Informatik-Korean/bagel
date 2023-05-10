import express from 'express';

import * as commentController from '../controller/comment.js';

import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.put('/:id', isAuth, commentController.updateComment);
router.delete('/:id',isAuth, commentController.deleteComment);

export default router;
