const router = require('express').Router()
const controller = require('../controllers/appController')

router.get('/', controller.getPosts);

module.exports = router;
