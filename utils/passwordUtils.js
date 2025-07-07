require('dotenv').config();
const bcrypt = require('bcryptjs');

const salt = Number(process.env.SALT);

async function hashPassword(input) {
  return await bcrypt.hash(input, salt);
}

async function verifyPassword(input, hashedPassword) {
  return await bcrypt.compare(input, hashedPassword);
}

module.exports = {
  hashPassword,
  verifyPassword,
}