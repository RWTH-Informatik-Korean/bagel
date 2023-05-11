import express from 'express';
import session from 'express-session';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import flash from 'connect-flash';

import passportGoogle from './passport/googleStrategy.js';
import { connectDB } from './database/database.js';

import authRouter from './router/auth.js';
import verificationRouter from './router/verification.js';
import cardsRouter from './router/cards.js';
import cardRouter from './router/card.js';
import commentRouter from './router/comment.js'
import { sessionConfig as config } from './config.js';

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
  secret: config.secret,
  resave: true,
  saveUninitialized: true,
  cookie: { httpOnly: false }
}));
app.use(flash());

passportGoogle(app);

app.use('/auth', authRouter);
app.use('/verification', verificationRouter);
app.use('/cards', cardsRouter);
app.use('/card', cardRouter);
app.use('/comment', commentRouter);

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
