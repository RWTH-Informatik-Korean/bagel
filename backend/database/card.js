import Mongoose from 'mongoose';

const cardSchema = new Mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, requierd: true },
    category: { type: String, requierd: true },
    username: { type: String, requierd: true },
    avataUrl: { type: String },
    term: { type: String, requierd: true },
    course: { type: String, requierd: true },
  }, { timestamps: true, versionKey: false }
);

const Card = Mongoose.model('cards', cardSchema);

export async function getAll(){
  return Card.find({});
}

export async function getList(){
  return Card.find({}, { id: 1, title: 1, category: 1, username: 1, term: 1, course: 1 });
}

export async function getCard(id){
  return Card.findById(id);
}

export async function create(title, text, category, term, course){
  return new Card({
    title,
    text,
    username: 'yoseob',
    category,
    term,
    course
  }).save();
}

export async function update(id, title, text, category, term, course) {
  return Card.findByIdAndUpdate(id, { title, text, category, term, course }, { returnOriginal: false });
}

export async function remove(id) {
  return Card.findByIdAndDelete(id);
}
