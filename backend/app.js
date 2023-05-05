import express from 'express';
import session from 'express-session';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import flash from 'connect-flash';

import passportGoogle from './passport/googleStrategy.js';
import { connectDB } from './database/database.js';
import * as courseCategoryRepository from './database/courseCategory.js';
import * as moduleCategoryRepository from './database/moduleCategory.js';
import * as postCategoryRepository from './database/postCategory.js';
import * as cardRepository from './database/card.js';
import authRouter from './router/auth.js'
import verificationRouter from './router/verification.js'
import { isAuth } from './middleware/auth.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(helmet());
app.use(cors({
  origin:"http://localhost:4200",
  credentials: true
}));
app.use(morgan('tiny'));
app.use(session({ 
  secret: 'SECRET',
  resave: true,
  saveUninitialized: true,
  cookie: { httpOnly: false }
}));
app.use(flash());

passportGoogle(app);

app.use('/auth', authRouter);
app.use('/verification', verificationRouter);

app.get('/category/module', async (req, res) => {
  const category = await moduleCategoryRepository.getAll();
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json({ message: 'category(module) not found' });
  }
});

app.get('/category/course', async (req, res) => {
  const category = await courseCategoryRepository.getAll();
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json({ message: 'category(course) not found' });
  }
});

app.get('/category/post', async (req, res) => {
  const category = await postCategoryRepository.getAll();
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json({ message: 'category(post) not found' });
  }
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

app.get('/cards', async (req, res, next) => {
  if(req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');

    const searchedCard = await cardRepository.searchCards(regex);
    if (searchedCard) {
      res.status(200).json(searchedCard);
    } else {
      res.status(404).json({ message: 'No card match that query, please try again.' });
    }
  } else if(req.query.category) {
    const category = req.query.category;
    const categoryCard = await cardRepository.categoryCards(category);
    if(categoryCard) {
      res.status(200).json(categoryCard);
    } else {
      res.status(404).json({ message: 'No card match the category, please try again.' });
    }
  } else if(req.query.course) {
    const course = req.query.course;
    const courseCard = await cardRepository.courseCards(course);
    if(courseCard) {
      res.status(200).json(courseCard);
    } else {
     res.status(404).json({ message: 'No card match the course, please try again.' });
    }
  } else {
    next();
  }
})

app.get('/cards/', async (req, res) => {
  const cards = await cardRepository.getAll();
  if(cards) {
    res.status(200).json(cards);
  } else {
    res.status(404).json({ message: 'cards not found' });
  }
});

app.get('/cards/list', async (req, res) => {
  const cardList = await cardRepository.getList();
  if(cardList) {
    res.status(200).json(cardList);
  } else {
    res.status(404).json({ message: 'cardlist not found' });
  }
});

app.get('/card/:id', isAuth, async (req, res) => {
  const id = req.params.id;
  const card = await cardRepository.getCard(id);
  if(card) {
    res.status(200).json(card);
  } else {
    res.status(404).json({ message: 'card not found' });
  }
});


app.post('/card', isAuth, async (req, res) => {
  const { title, text, username, avatarUrl, category, term, course, views } = req.body;
  const card = await cardRepository.create(title, text, username, avatarUrl, category, term, course, views);
  res.status(201).json(card);
});

app.put('/card/:id', isAuth, async (req, res) => {
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

app.put('/card/views/:id', async (req, res) => {
  const id = req.params.id;
  const views = req.body;
  
  const newCard = cardRepository.viewsUpdate(id, views);

  if (!newCard) {
    res.status(404).json({ message: `card not found :${id}` });
  } 
  res.status(200).json;
})

app.delete('/card/:id', isAuth, async (req, res) => {
  const id = req.params.id;
  const card = await cardRepository.getCard(id);
  
  if(!card){
    res.status(404).json({ message: `card not found :${id}` });
  } else if(card.username != req.user.username){
    res.status(403).json({ message: 'user is not author' });
  } else {
  await cardRepository.remove(id);
  res.sendStatus(204);
  }
});


app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

connectDB()
  .then(() => {
    console.log('Connected DB-Server!');
    app.listen(port, () => {
      console.log(`on port ${port} ${new Date()}`)
    })
  })
  .catch(console.error)
