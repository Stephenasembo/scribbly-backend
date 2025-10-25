  require('dotenv').config();
const userModel = require('../services/user')
const passwordUtil = require('../utils/passwordUtils')
const jwt = require('../config/jwtAuth');
const adminCode = process.env.ADMIN_CODE;
const authorizeUser = require('../middleware/authorizeUser');

async function createRegularUser(req, res, next) {
  const userData = req.body;
  userData.password = await passwordUtil.hashPassword(user.password);
  const userAccount = await userModel.createUser(user);
  if (!userAccount) {
      return res.status(400).json({
      message: 'Username and email should be unique'
    })
  }

  const token = jwt.generateToken(userAccount);
  delete userAccount.password;
  req.userAccount = userAccount;
  req.token = token;
  next();
}

module.exports = {
  createUser: [createRegularUser, (req, res, next) => {
    const {userAccount, token} = req
    res.status(200).json({
      data: {token, user: userAccount},
      message: 'User created successfully.'
    });
  },],

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

  createAdmin: [async (req, res, next) => {
    const { secretCode } = req.body;
    if(secretCode === adminCode) {
      return next()
    }
    return res.status(400).json({message: 'Wrong passcode.'})
  },
  createRegularUser,
  async (req, res, next) => {
    const { userAccount, token } = req;
    const updatedUser = await userModel.makeAdmin(userAccount.id);
    delete updatedUser.password;
    return res.status(200).json({
      data: {token, user: updatedUser},
      message: 'Admin created successfully.'
    })
  }],

  getUser: [authorizeUser, async(req, res, next) => {
    if(req.user) {
      return res.status(200).json({
        user: req.user
      })
    }
    return res.status(401).json({message: 'User not found.'})
  },],
}
