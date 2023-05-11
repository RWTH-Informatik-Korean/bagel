import dotenv from 'dotenv';

dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  db: {
    host: required('DB_HOST'),
  },  
}

export const googleConfig = {
  id: required('GOOGLE_ID'),
  secret: required('GOOGLE_SECRET')
}

export const nodemailerConfig = {
  user: required('NODEMAILER_USER'),
  pass : required('NODEMAILER_PASS')
}

export const sessionConfig = {
  secret: required('SESSION_SECRET')
}
