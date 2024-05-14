import express from 'express';

import * as cardController from '../controller/card.js';
import * as commentController from '../controller/comment.js';

import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', isAuth, cardController.getCard);
router.post('/', isAuth, cardController.createCard);
router.put('/:id', isAuth, cardController.updateCard);
router.delete('/:id', isAuth, cardController.deleteCard);
router.put('/views/:id', cardController.viewsUpdate);
router.get('/:id/comments', isAuth, commentController.getComments);
router.post('/:id/comment', isAuth, commentController.createComment);

export default router;
