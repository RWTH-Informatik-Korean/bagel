import Mongoose from 'mongoose';

const userSchema = new Mongoose.Schema(
  {
    username: { type: String, required: true },
    googleID: { type: String, requierd: true },
    avataUrl: { type: String },
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
    avataUrl
  }).save();
}

export async function update(googleID, username, avataUrl){
  return User.findOneAndUpdate({ googleID: googleID }
    , { username: username, avataUrl: avataUrl });
}

export async function remove(id) {
  return User.findByIdAndDelete(id);
}
