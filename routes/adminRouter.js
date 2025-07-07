const router = require('express').Router()
const controller = require('../controllers/adminController')

router.post('/post', controller.createPost);

module.exports = router;
