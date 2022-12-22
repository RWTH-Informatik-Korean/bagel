import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { connectDB } from './database/database.js';
import * as courseCategoryRepository from './database/courseCategory.js';
import * as moduleCategoryRepository from './database/moduleCategory.js';
import * as postCategoryRepository from './database/postCategory.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.get('/category/module', async (req, res) => {
  const category = await moduleCategoryRepository.getAll();
  res.status(200).json(category)
})

app.get('/category/course', async (req, res) => {
  const category = await courseCategoryRepository.getAll();
  res.status(200).json(category)
})

app.get('/category/post', async (req, res) => {
  const category = await postCategoryRepository.getAll();
  res.status(200).json(category)
})

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
