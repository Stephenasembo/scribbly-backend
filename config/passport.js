require('dotenv').config();
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../services/user')

const secret = process.env.SECRET;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}

async function verify(jwt_payload, done) {
  try {
    const user = await User.findUser(jwt_payload.sub);
    if(!user) {
      return done(null, false);
    }
    return done(null, user);
  }
  catch(err) {
    console.error(err);
    return done(err, false)
  }
}

const strategy = new JWTStrategy(options, verify)

passport.use(strategy);

module.exports = passport;