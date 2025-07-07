const postModel = require('../services/post');

module.exports = {
  getPosts: async (req, res, next) => {
    const { limit } = req.query;
    console.log(limit);
    const posts = await postModel.getPosts(limit);
    res.status(200).json({ posts });
  }
}