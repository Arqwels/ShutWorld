const Router = require('express').Router;
const userController = require('../controllers/userController');
const router = new Router();

// http://localhost:5000/api/mail/activate/:link
router.get('/activate/:link', userController.activate);

module.exports = router;