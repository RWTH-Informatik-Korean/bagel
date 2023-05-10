import express from 'express';

import * as cardRepository from '../database/card.js';

import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  const username = req.user.username;

  const comment = await cardRepository.getComment(id);

  if(!comment){
    res.status(404).json({ message: `comment not found: ${id}` });
  } else if(username != comment.username) {
    res.status(403).json({ message: `user is not autor`});
  } else {
    const update = await cardRepository.commentUpdate(id, text);
    res.status(200).json(update);
  }
});

router.delete('/:id', isAuth, async (req, res) => {
  const id = req.params.id;
  const username = req.user.username;

  const comment = await cardRepository.getComment(req.params.id);

  if(!comment){
    res.status(404).json({ message: `comment not found: ${id}` });
  } else if(username != comment.username) {
    res.status(403).json({ message: `user is not autor`});
  } else {
    const remove = await cardRepository.commentRemove(id);
    res.status(200).json(remove);
  }
});

export default router;
