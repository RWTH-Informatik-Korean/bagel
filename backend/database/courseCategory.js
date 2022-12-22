import Mongoose from 'mongoose';

const courseCategorySchema = new Mongoose.Schema(
  {
    courseCategory : { category: { type: String, required: true } }
  }, {
    versionKey: false
  }
)

const Category = Mongoose.model('coursecategories', courseCategorySchema);

export async function getAll() {
  return Category.find({});
}

