import * as cardRepository from '../database/card.js';

export async function getCard(req, res) {
  const id = req.params.id;
  const card = await cardRepository.getCard(id);

  card.views = card.views + 1;
  card.save();

  if(card) {
    res.status(200).json(card);
  } else {
    res.status(404).json({ message: 'card not found' });
  }
}

export async function createCard(req, res) {
  const { title, text, category, term, course } = req.body;
  const { googleID, username, avatarUrl } = req.user;
  const card = await cardRepository.create(title, text, category, username, avatarUrl, term, course, googleID);
  res.status(201).json(card);
}

export async function updateCard(req, res) {
  const { title, text, category, term, course, views } = req.body;
  const { username, avatarUrl } = req.user;
  const id = req.params.id;
  const card = await cardRepository.getCard(id);
  
  if(!card){
    res.status(404).json({ message: `card not found :${id}` });
  } else if(card.username != username){
    res.status(403).json({ message: 'user is not author' });
  } else {
    const updated = await cardRepository.update(id, title, text, category, avatarUrl, username,  term, course, views);
    res.status(200).json(updated);
  }
}

export async function deleteCard(req, res) {
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
}

export async function viewsUpdate(req, res) {
  const id = req.params.id;
  const views = req.body;
  
  const newCard = cardRepository.viewsUpdate(id, views);

  if (!newCard) {
    res.status(404).json({ message: `card not found :${id}` });
  } 
  res.status(200).json;
}
