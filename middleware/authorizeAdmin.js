module.exports = async function (req, res, next) {
  if(req.user.admin) {
    return next();
  }
  return res.status(403).json({message: 'You need to be an admin to access this resource.'})
}