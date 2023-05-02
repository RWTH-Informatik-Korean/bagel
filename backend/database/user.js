import Mongoose from 'mongoose';

import * as cardRepasitory from './card.js';

const userSchema = new Mongoose.Schema(
  {
    username: { type: String, required: true },
    googleID: { type: String, requierd: true },
    avataUrl: { type: String },
    postCards: [],
    postComments: [],
    }, { timestamps: true, versionKey: false }
);

const User = Mongoose.model('users', userSchema);

export async function findUser(googleID){
  return User.findOne({ googleID: googleID });
}

export async function create(username, googleID, avataUrl){
  return new User({
    username,
    googleID,
    avataUrl,
  }).save();
}

export async function update(googleID, username, avataUrl){
  const user = await User.findOneAndUpdate({ googleID }, { username, avataUrl });
  user.postCards.map(async (cardId) => {
    if(username){
      await cardRepasitory.updateUsername(cardId, username);
    }
    if(avataUrl){
      await cardRepasitory.updateAvataUrl(cardId, avataUrl);
    }
  });
  user.postComments.map(async (cardId) => {
    if(username){
      await cardRepasitory.commentUpdateUsername(cardId, username);
    }
    if(avataUrl){
      await cardRepasitory.commentUpdateAvataUrl(cardId, avataUrl);
    }
  });
  return user;
}

export async function remove(id) {
  return User.findByIdAndDelete(id);
}

export async function updatePostCards(googleID, cardId){
 await User.findOneAndUpdate({ googleID }, { $push : { postCards : cardId }});
}

export async function updatePostComments(googleID, commentId){
  await User.findOneAndUpdate({ googleID }, { $push : { postComments : commentId }});
}

export async function deletePostCards(googleID, cardId){
  const ObjectId = Mongoose.Types.ObjectId;
  await User.findOneAndUpdate({ googleID }, { $pull : { postCards : ObjectId(cardId) }});
}
