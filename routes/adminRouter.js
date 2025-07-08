const router = require('express').Router()
const controller = require('../controllers/adminController')

router.post('/post', controller.createPost);
router.patch('/posts/:postId', controller.togglePublishStatus)
router.delete('/posts/:postId', controller.deletePost);
router.put('/posts/:postId', controller.updatePost);

module.exports = router;
