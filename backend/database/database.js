import Mongoose from "mongoose";
import { config } from '../config.js';

export async function connectDB() {
  //Local test background
  await Mongoose.connect(
    'mongodb://mongodb:27017/bagel_db', {
      authSource: "admin",
      user: "admin",
      pass: "password",
      useNewUrlParser: true,
      useUnifiedTopology: true})
     .then(() => console.log('MongoDB Connected'))
     .catch(err => console.log(err));
  //Main DB test background
  // return Mongoose.connect(config.db.host);
}
