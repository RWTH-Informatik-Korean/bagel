import Mongoose from 'mongoose';

const postCategorySchema = new Mongoose.Schema(
  {
    postCategory : { category: { type: String, required: true } }
  }, {
    versionKey: false
  }
)

const Category = Mongoose.model('postcategories', postCategorySchema);

export async function getAll() {
  return Category.find({});
}

