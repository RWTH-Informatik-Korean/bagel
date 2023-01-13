import Mongoose from 'mongoose';

const verificationSchema = new Mongoose.Schema(
  {
    email: { type: String, required: true },
    verificationCode: { type: String, requierd: true },
    verified: { type: Boolean, requierd: true }
  }, { timestamps: true, versionKey: false }
);

const Verification = Mongoose.model('verification', verificationSchema);

export async function get(email) {
  return Verification.findOne({ email: email });
}

export async function create(email, verificationCode) {
  return new Verification({
    email,
    verificationCode,
    verified: false,
  }).save();
}

export async function verified(email) {
  return Verification.findOneAndUpdate({ email: email }, { verified: true });
}

export async function remove(id) {
  return Verification.findByIdAndDelete(id);
}
