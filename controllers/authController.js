const userModel = require('../services/user')
const passwordUtil = require('../utils/passwordUtils')
const jwt = require('../config/jwtAuth');

module.exports = {
  createUser: async (req, res, next) => {
    const user = req.body;
    user.password = await passwordUtil.hashPassword(user.password);
    const userAccount = await userModel.createUser(user);
    const token = jwt.generateToken(userAccount);
    res.json(token);
  },
  loginUser: async (req, res, next) => {
    const { username, password } = req.body;
    const user = await userModel.findUser(null, username);
    if(!user) {
      return res.status(401).json('User not found')
    }
    const isPasswordValid = await passwordUtil.verifyPassword(password, user.password)
    if(!isPasswordValid) {
      return res.status(401).json('Incorrect password')
    }
    req.user = user;
    const token = jwt.generateToken(user);
    if(!token) {
      return res.status(500).json('An internal error occurred')
    }
    return res.status(200).json(token);
  }
}
