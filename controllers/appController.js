const postModel = require('../services/post');

module.exports = {
  getPosts: async (req, res, next) => {
    const { limit } = req.query;
    console.log(limit);
    const posts = await postModel.getPosts(limit);
    res.status(200).json({ posts });
  },
  getPost: async (req, res, next) => {
    const id = req.params.postId;
    const post = await postModel.getPost(id);
    res.status(200).json({ post });
  }
}