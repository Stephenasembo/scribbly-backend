const postModel = require('../services/post');

module.exports = {
  getPosts: async (req, res, next) => {
    const posts = await postModel.getPosts();
    res.status(200).json({ posts });
  }
}