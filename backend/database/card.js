import Mongoose from 'mongoose';

import * as userRepasitory from './user.js';

const commentSchema = new Mongoose.Schema(
  {
    cardId : { type: String, require: true },
    text: { type: String, require: true },
    username: { type: String, require: true },
    avatarUrl: { type: String },
  }, { timestamps: true, versionKey: false }
);
const Comment = new Mongoose.model('comments', commentSchema);

const cardSchema = new Mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, requierd: true },
    category: { type: String, requierd: true },
    username: { type: String, requierd: true },
    avatarUrl: { type: String },
    term: { type: String, requierd: true },
    course: { type: String, requierd: true },
    views: { type: Number, required: true },
    comments: [],
  }, { timestamps: true, versionKey: false }
);

const Card = Mongoose.model('cards', cardSchema);

export async function getAll(){
  return Card.find({}).sort({ "_id": -1 });
}

export async function categoryCards(category) {
  return Card.find({ category: category }, { id: 1, title: 1, category: 1, username: 1, term: 1, course: 1, views: 1 }).sort({ "_id": -1 });
}

export async function courseCards(course) {
  return Card.find({ course: course }, { id: 1, title: 1, category: 1, username: 1, term: 1, course: 1, views: 1 }).sort({ "_id": -1 });
}

export async function getList(){
  return Card.find({}, { id: 1, title: 1, category: 1, username: 1, term: 1, course: 1, views: 1 }).sort({ "_id": -1 });
}

export async function getCard(id){
  return Card.findById(id);
}

export async function create(title, text, category, term, course, username, googleID){
  const card = await new Card({
    title,
    text,
    username,
    category,
    term,
    course,
    views: 0,
  }).save();
  await userRepasitory.updatePostCards(googleID, card._id);
  return card;
}

export async function searchCards(keyword) {
  return Card.find({$or: [{ title: keyword }, { text: keyword }]});
}

export async function searchCards(keyword) {
  return Card.find({$or: [{ title: keyword }, { text: keyword }]});
}

export async function update(id, title, text, category, term, course) {
  return Card.findByIdAndUpdate(id, { title, text, category, term, course }, { returnOriginal: false });
}
export async function updateUsername(id, username){
  await Card.findByIdAndUpdate(id, { username });
}

export async function updateAvatarUrl(id, avatarUrl){
  await Card.findByIdAndUpdate(id, { avatarUrl });
}

export async function remove(id, googleID) {
  await userRepasitory.deletePostCards(googleID, id);
  return Card.findByIdAndDelete(id);
}

export async function commentCreate(cardId, text, username, googleID) {
  const comment = await new Comment({ cardId, text, username }).save();
  await Card.findByIdAndUpdate(cardId, { $push : { comments: comment._id } }, { returnOriginal: false });
  await userRepasitory.updatePostComments(googleID, comment._id);
  return comment;
}

export async function getComment(id) {
  return Comment.findById(id);
}

export async function commentUpdate(id, text) {
  return Comment.findByIdAndUpdate(id, { text }, { returnOriginal: false });
}

export async function commentUpdateUsername(id, username){
  await Comment.findByIdAndUpdate(id, { username });
}

export async function commentUpdateAvatarUrl(id, avatarUrl){
  await Comment.findByIdAndUpdate(id, { avatarUrl });

}

export async function commentRemove(id) {
  return Comment.findByIdAndUpdate(id, { text : '삭제 되었습니다.'}, { returnOriginal: false });
}

export async function getComments(comments) {
  return await Promise.all(
    comments.map(async (commentId) => await getComment(commentId))
    );
}
