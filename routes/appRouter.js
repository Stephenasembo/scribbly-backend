const router = require('express').Router()
const controller = require('../controllers/appController')

router.get('/posts', controller.getPosts);
router.get('/posts/:postId', controller.getPost);
router.post('/posts/:postId/comments', controller.createComment);

module.exports = router;
