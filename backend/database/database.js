import Mongoose from "mongoose";
import { config } from '../config.js';

export async function connectDB() {
  //Local test background
  mongoose.connect(
    'mongodb://admin:password@mongodb:27017/', { useUnifiedTopology: true })
     .then(() => console.log('MongoDB Connected'))
     .catch(err => console.log(err));
  //Main DB test background
  //return Mongoose.connect(config.db.host);
}
