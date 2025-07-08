const postModel = require('../services/post');
const commentModel = require('../services/comment')

module.exports = {
  getPosts: async (req, res, next) => {
    const { limit } = req.query;
    const posts = await postModel.getPosts(limit);
    res.status(200).json({ posts });
  },
  getPost: async (req, res, next) => {
    const id = req.params.postId;
    const post = await postModel.getPost(id);
    res.status(200).json({ post });
  },
  createComment: async (req, res, next) => {
    const { postId } = req.params;
    const userId = req.user.id;
    const { content } = req.body;
    const commentData = {
      postId, userId, content
    }
    const comment = await commentModel.createComment(commentData);
    return res.status(200).json({
      data: comment,
      message: 'Comment created successfully',
    })
  }
}