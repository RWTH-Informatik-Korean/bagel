import Mongoose from 'mongoose';

const userSchema = new Mongoose.Schema(
  {
    username: { type: String, required: true },
    googleID: { type: String, requierd: true },
    avataUrl: { type: String },
    }, { timestamps: true, versionKey: false }
);

const User = Mongoose.model('users', userSchema);

export async function getUser(googleID){
  return User.findById(id);
}

export async function findUser(googleID){
  return User.findOne({
    where: {googleID: googleID}
  });
}

export async function create(username, googleID, avataUrl){
  return new User({
    username,
    googleID,
    avataUrl
  }).save();
}

export async function remove(id) {
  return Card.findByIdAndDelete(id);
}
