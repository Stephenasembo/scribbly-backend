const router = require('express').Router()
const controller = require('../controllers/authController')

router.post('/sign-up', controller.createUser)
router.post('/login', controller.loginUser);
router.post('/admin/signup', controller.createAdmin);
router.get('/user', controller.getUser);

module.exports = router;
