import express from 'express';

import * as cardsController from '../controller/cards.js';

const router = express.Router();

router.get('/', cardsController.getCards);

router.get('/list', cardsController.getCards);

export default router;
