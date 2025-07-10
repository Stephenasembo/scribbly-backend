const router = require('express').Router()
const controller = require('../controllers/adminController');
const authorizeAdmin = require('../middleware/authorizeAdmin');
const authorizeUser = require('../middleware/authorizeUser');

router.use([authorizeUser, authorizeAdmin]);
router.post('/post', controller.createPost);
router.patch('/posts/:postId', controller.togglePublishStatus)
router.delete('/posts/:postId', controller.deletePost);
router.put('/posts/:postId', controller.updatePost);
router.delete('/comments/:commentId', controller.deleteComment);

module.exports = router;
