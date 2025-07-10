const passport = require('../config/passport')

module.exports = [async function (req, res, next) {
  console.log(req.headers);
  next()
}, passport.authenticate('jwt', { session: false })]
