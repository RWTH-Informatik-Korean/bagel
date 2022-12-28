import mongoose from "mongoose";
import { config } from '../config.js';

export async function connectDB() {
  return mongoose.connect(config.db.host);
  //Local test background
  // mongoose.connect(
  //   config.db.host, { useUnifiedTopology: true })
  //    .then(() => console.log('MongoDB Connected'))
  //    .catch(err => console.log(err));
  //Main DB test background
  //return Mongoose.connect(config.db.host);
}
