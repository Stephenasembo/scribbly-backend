const router = require('express').Router()
const controller = require('../controllers/adminController')

router.post('/post', controller.createPost);
router.patch('/posts/:postId', controller.togglePublishStatus)

module.exports = router;
