import express from 'express';

import * as cardRepository from '../database/card.js';

const router = express.Router();

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get('/', async (req, res, next) => {
  const page = req.query.page;
  if(req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');

    const searchedCard = await cardRepository.searchCards(regex, page);
    if (searchedCard) {
      res.status(200).json(searchedCard);
    } else {
      res.status(404).json({ message: 'No card match that query, please try again.' });
    }
  } else if(req.query.category) {
    const category = req.query.category;
    const categoryCard = await cardRepository.categoryCards(category, page);
    if(categoryCard) {
      res.status(200).json(categoryCard);
    } else {
      res.status(404).json({ message: 'No card match the category, please try again.' });
    }
  } else if(req.query.course) {
    const course = req.query.course;
    const courseCard = await cardRepository.courseCards(course, page);
    if(courseCard) {
      res.status(200).json(courseCard);
    } else {
     res.status(404).json({ message: 'No card match the course, please try again.' });
    }
  } else {
    next();
  }
})

router.get('/', async (req, res) => {
  const page = req.query.page;
  const cards = await cardRepository.getPages(page);
  if(cards) {
    res.status(200).json(cards);
  } else {
    res.status(404).json({ message: 'cards not found' });
  }
});

router.get('/list', async (req, res) => {
  const cardList = await cardRepository.getList();
  if(cardList) {
    res.status(200).json(cardList);
  } else {
    res.status(404).json({ message: 'cardlist not found' });
  }
});

export default router;
