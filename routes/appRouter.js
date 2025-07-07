const router = require('express').Router()
const controller = require('../controllers/appController')

router.get('/posts', controller.getPosts);
router.get('/posts/:postId', controller.getPost);

module.exports = router;
