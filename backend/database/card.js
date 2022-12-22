import Mongoose from 'mongoose';

const cardSchema = new Mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, requierd: true },
    category: { type: String, requierd: true },
    username: { type: String, requierd: true },
    term: { type: String, requierd: true },
    course: { type: String, requierd: true },
  }
);

const Card = Mongoose.model('Card', cardSchema);

export async function getAll() {
  return Card.find().sort({ creat})
}
