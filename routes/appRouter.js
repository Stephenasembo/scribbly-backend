const router = require('express').Router()
const controller = require('../controllers/appController');
const authorizeUser = require('../middleware/authorizeUser');

router.use(authorizeUser)
router.get('/posts', controller.getPosts);
router.get('/posts/:postId', controller.getPost);
router.post('/posts/:postId/comments', controller.createComment);
router.put('/comments/:commentId', controller.updateComment);

module.exports = router;
