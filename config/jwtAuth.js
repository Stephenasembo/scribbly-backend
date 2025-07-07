require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

async function generateToken(user) {
  try{
    const token = jwt.sign({sub: user.id}, secret, { expiresIn: '1d' });
    return token;
  }
  catch(err) {
    console.error(err)
    return null;
  }
}

module.exports = {
  generateToken
}