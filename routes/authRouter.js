const router = require('express').Router()
const controller = require('../controllers/authController')

router.post('/sign-up', controller.createUser)
router.post('/login', controller.loginUser);

module.exports = router;
