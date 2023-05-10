import express from 'express';

import * as cardRepository from '../database/card.js';

import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', isAuth, async (req, res) => {
  const id = req.params.id;
  const card = await cardRepository.getCard(id);

  card.views = card.views + 1;
  card.save();

  if(card) {
    res.status(200).json(card);
  } else {
    res.status(404).json({ message: 'card not found' });
  }
});


router.post('/', isAuth, async (req, res) => {
  const { title, text, category, term, course } = req.body;
  const { googleID, username, avatarUrl } = req.user;
  const card = await cardRepository.create(title, text, category, username, avatarUrl, term, course, googleID);
  res.status(201).json(card);
});

router.put('/:id', isAuth, async (req, res) => {
  const { title, text, username, avatarUrl, category, term, course, views } = req.body;
  const id = req.params.id;
  const card = await cardRepository.getCard(id);
  
  if(!card){
    res.status(404).json({ message: `card not found :${id}` });
  } else if(card.username != req.user.username){
    res.status(403).json({ message: 'user is not author' });
  } else {
    const updated = await cardRepository.update(id, title, text, username, avatarUrl, category, term, course, views);
    res.status(200).json(updated);
  }
});

router.put('/views/:id', async (req, res) => {
  const id = req.params.id;
  const views = req.body;
  
  const newCard = cardRepository.viewsUpdate(id, views);

  if (!newCard) {
    res.status(404).json({ message: `card not found :${id}` });
  } 
  res.status(200).json;
})

router.delete('/:id', isAuth, async (req, res) => {
  const id = req.params.id;
  const { googleID, username } = req.user;
  const card = await cardRepository.getCard(id, googleID);

  if(!card){
    res.status(404).json({ message: `card not found :${id}` });
  } else if(card.username != username){
    res.status(403).json({ message: 'user is not author' });
  } else {
    await cardRepository.remove(id);
    res.sendStatus(204);
  }
});

router.post('/:id/comment', isAuth, async (req, res) => {
  const cardId = req.params.id;
  const text = req.body.text;
  const { googleID, username } = req.user;

  const comment = await cardRepository.commentCreate(cardId, text, username, googleID);
  res.status(201).json(comment);
});

export default router;
