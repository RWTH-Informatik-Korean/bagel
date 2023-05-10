import * as cardRepository from '../database/card.js';

export async function createComment(req, res) {
  const cardId = req.params.id;
  const text = req.body.text;
  const { googleID, username, avatarUrl } = req.user;

  const comment = await cardRepository.commentCreate(cardId, text, username, googleID, avatarUrl);
  res.status(201).json(comment);
}

export async function updateComment(req, res) {
  const id = req.params.id;
  const text = req.body.text;
  const googleID = req.user.googleID;

  const comment = await cardRepository.getComment(id);

  if(!comment){
    res.status(404).json({ message: `comment not found: ${id}` });
  } else if(googleID != comment.googleID) {
    res.status(403).json({ message: `user is not autor`});
  } else {
    const update = await cardRepository.commentUpdate(id, text);
    res.status(200).json(update);
  }
}

export async function deleteComment(req, res) {
  const id = req.params.id;
  const googleID = req.user.googleID;

  const comment = await cardRepository.getComment(req.params.id);

  if(!comment){
    res.status(404).json({ message: `comment not found: ${id}` });
  } else if(googleID != comment.googleID) {
    res.status(403).json({ message: `user is not autor`});
  } else {
    const remove = await cardRepository.commentRemove(id);
    res.status(200).json(remove);
  }
}
