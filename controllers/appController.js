const postModel = require('../services/post');
const commentModel = require('../services/comment')

module.exports = {
  getPosts: async (req, res, next) => {
    const { limit } = req.query;
    let posts = await postModel.getPosts(limit);
    posts = posts.map((post) => ({
      ...post,
      author: post.user.username,
      user: null
    }))
    res.status(200).json({
      data: posts,
      message: 'Posts retrieval successful'
    });
  },
  getPost: async (req, res, next) => {
    const id = req.params.postId;
    const post = await postModel.getPost(id);
    post.author = post.user.username;
    delete post.user;
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
    const updatedComment = await commentModel.updateComment(commentId, content);
    return res.status(200).json({
      data: updatedComment,
      message: 'Comment updated successfully.',
    });
  },
  deleteComment: async (req, res, next) => {
    const { commentId } = req.params;
    const userId = req.user.id;
    const comment = await commentModel.findComment(commentId);
    console.log(comment);
    if(userId === comment.userId) {
      const deletedComment = await commentModel.deleteComment(commentId);
      return res.sendStatus(204)
    }
    return res.status(403).json({message: 'You are not authorized to delete this message.'})
  }
}