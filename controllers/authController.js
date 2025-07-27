  require('dotenv').config();
const userModel = require('../services/user')
const passwordUtil = require('../utils/passwordUtils')
const jwt = require('../config/jwtAuth');
const adminCode = process.env.ADMIN_CODE;
const authorizeUser = require('../middleware/authorizeUser');

module.exports = {
  createUser: async (req, res, next) => {
    const user = req.body;
    user.password = await passwordUtil.hashPassword(user.password);
    const userAccount = await userModel.createUser(user);
    const token = jwt.generateToken(userAccount);
    delete userAccount.password;
    res.status(200).json({
      data: {token, user: userAccount},
      message: 'User created successfully.'
    });
  },
  loginUser: async (req, res, next) => {
    const { username, password } = req.body;
    const user = await userModel.findUser(null, username);
    if(!user) {
      return res.status(401).json({message: 'User not found'})
    }
    const isPasswordValid = await passwordUtil.verifyPassword(password, user.password)
    if(!isPasswordValid) {
      return res.status(401).json({message: 'Incorrect password'})
    }
    req.user = user;
    const token = jwt.generateToken(user);
    if(!token) {
      return res.status(500).json({message: 'An internal error occurred'})
    }
    delete user.password;
    return res.status(200).json({
      token,
      user,
    });
  },
  createAdmin: [authorizeUser, async (req, res, next) => {
    const { adminSecret } = req.body;
    if(adminSecret === adminCode) {
      const user = await userModel.makeAdmin(req.user.id);
      return res.status(200).json({message: 'User is now an admin.'})
    }
    return res.status(400).json({message: 'Wrong passcode.'})
  },],
  getUser: [authorizeUser, async(req, res, next) => {
    if(req.user) {
      return res.status(200).json({
        user: req.user
      })
    }
    return res.status(401).json({message: 'User not found.'})
  },],
}
