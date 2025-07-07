const postModel = require('../services/post')

module.exports = {
  createPost: async (req, res, next) => {
    const postData = req.body;
    const post = await postModel.createPost(postData);
    res.status(201).json({message: 'Post created.'})
  }
}