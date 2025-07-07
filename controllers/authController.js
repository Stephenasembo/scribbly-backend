const userModel = require('../services/user')
const passwordUtil = require('../utils/passwordUtils')

module.exports = {
  createUser: async (req, res, next) => {
    const user = req.body;
    user.password = await passwordUtil.hashPassword(user.password);
    userModel.createUser(user);
    res.send('User created');
  }
}