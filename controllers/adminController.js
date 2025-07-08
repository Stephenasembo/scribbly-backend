const postModel = require('../services/post')

module.exports = {
  createPost: async (req, res, next) => {
    const postData = req.body;
    const post = await postModel.createPost(postData);
    res.status(201).json({message: 'Post created.'})
  },
  togglePublishStatus: async (req, res, next) => {
    try {
      const { postId } = req.params;
      const post = await postModel.togglePublish(postId);
      return res.status(200).json({
        data: post.retrievedPost,
        message: post.message,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'An internal error occurred'})
    }
  }
}