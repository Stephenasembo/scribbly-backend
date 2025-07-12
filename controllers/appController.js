const postModel = require('../services/post');
const commentModel = require('../services/comment')

module.exports = {
  getPosts: async (req, res, next) => {
    const { limit } = req.query;
    const posts = await postModel.getPosts(limit);
    res.status(200).json({
      data: posts,
      message: 'Posts retrieval successful'
    });
  },
  getPost: async (req, res, next) => {
    const id = req.params.postId;
    const post = await postModel.getPost(id);
    res.status(200).json({
      data: post,
      message: 'Post retrieved successfully'
    });
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
  },
  updateComment: async (req, res, next) => {
    const { commentId } = req.params;
    const { content } = req.body;
    const updatedComment = await Prisma.commentModel.updateComment(commentId, content);
    return res.status(200).json({
      data: updatedComment,
      message: 'Comment updated successfully.',
    });
  }
}