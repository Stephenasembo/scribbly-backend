const router = require('express').Router()
const controller = require('../controllers/adminController')

router.post('/post', controller.createPost);
router.patch('/posts/:postId', controller.togglePublishStatus)
router.delete('/posts/:postId', controller.deletePost);

module.exports = router;
