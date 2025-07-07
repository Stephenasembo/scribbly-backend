const userModel = require('../services/user')
const passwordUtil = require('../utils/passwordUtils')
const jwt = require('../config/jwtAuth')

module.exports = {
  createUser: async (req, res, next) => {
    const user = req.body;
    user.password = await passwordUtil.hashPassword(user.password);
    const userAccount = await userModel.createUser(user);
    const token = jwt.generateToken()
    res.send('User created');
  }
}