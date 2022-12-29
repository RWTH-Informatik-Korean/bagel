import express from 'express';
import session from 'express-session';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import passport from 'passport';

import { google } from './passport/googleStrategy.js'
import { connectDB } from './database/database.js';
import * as courseCategoryRepository from './database/courseCategory.js';
import * as moduleCategoryRepository from './database/moduleCategory.js';
import * as postCategoryRepository from './database/postCategory.js';
import * as cardRepository from './database/card.js';
import * as userRepository from './database/user.js'
import authRouter from './router/auth.js'


const app = express();
const port = 8080;

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(session({ 
  secret: 'SECRET',
  resave: true,
  saveUninitialized: true
}));

app.use('/auth', authRouter);


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.googleID);
});

passport.deserializeUser((id, done) => {
  userRepository.findUser(id)
    .then(user => done(null, user))
    .catch(err => done(err));
}); 
google();

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

app.get('/cards', async (req, res) => {
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

app.get('/card/:id', async (req, res) => {
  const id = req.params.id;
  const card = await cardRepository.getCard(id);
  if(card) {
    res.status(200).json(card);
  } else {
    res.status(404).json({ message: 'card not found' });
  }
});

app.post('/card', async (req, res) => {
  const { title, text, category, term, course } = req.body;
  const card = await cardRepository.create(title, text, category, term, course );
  res.status(201).json(card);
})

app.put('/card/:id', async (req, res) => {
  const { title, text, category, term, course } = req.body;
  const id = req.params.id;
  const card = await cardRepository.getCard(id);
   if(!card){
    res.status(404).json({ message: `card not found :${id}` });
  }
  const updated = await cardRepository.update(id, title, text, category, term, course);
  res.status(200).json(updated);
})

app.delete('/card/:id', async (req, res) => {
  const id = req.params.id;
  const card = await cardRepository.getCard(id);
   if(!card){
    res.status(404).json({ message: `card not found :${id}` });
  }
  await cardRepository.remove(id);
  res.sendStatus(204);
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
