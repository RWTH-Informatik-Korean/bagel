import Mongoose from 'mongoose';

const moduleCategorySchema = new Mongoose.Schema(
  {
    moduleCategory : { category: { type: String, required: true } }
  }, {
    versionKey: false
  }
)

const Category = Mongoose.model('modulecategories', moduleCategorySchema);

export async function getAll() {
  return Category.find({});
}

