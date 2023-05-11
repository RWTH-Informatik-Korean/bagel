import Mongoose from 'mongoose';

import * as cardRepository from './card.js';

const userSchema = new Mongoose.Schema(
  {
    username: { type: String, required: true },
    googleID: { type: String, requierd: true },
    avatarUrl: { type: String },
    postCards: [],
    postComments: [],
    rwthVerified: { type: Boolean, requried: true }
    }, { timestamps: true, versionKey: false }
);

const User = Mongoose.model('users', userSchema);

export async function findUser(googleID){
  return User.findOne({ googleID: googleID });
}

export async function findUsername(username){
  return User.findOne({ username: username });
}

export async function create(username, googleID, avatarUrl, rwthVerified){
  return new User({
    username,
    googleID,
    avatarUrl,
    rwthVerified
  }).save();
}

export async function update(googleID, username, avatarUrl){
  const user = await User.findOneAndUpdate({ googleID }, { username, avatarUrl });
  user.postCards.map(async (cardId) => {
    if(username){
      await cardRepository.updateUsername(cardId, username);
    }
    if(avatarUrl){
      await cardRepository.updateAvatarUrl(cardId, avatarUrl);
    }
  });
  user.postComments.map(async (cardId) => {
    if(username){
      await cardRepository.commentUpdateUsername(cardId, username);
    }
    if(avatarUrl){
      await cardRepository.commentUpdateAvatarUrl(cardId, avatarUrl);
    }
  });
  return user;
}

export async function updateVerfied(userID) {
  return User.findOneAndUpdate({ _id: userID }
    , { rwthVerified: true });
}

export async function getAvatar(username) {
  const user = await User.findOne({ username: username });
  if (!user) throw new Error("User not found");
  return user.avatarUrl;
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
