const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const {body} = require('express-validator');


// http://localhost:5000/api/user/registration
router.post('/registration',
  body('nickname').isLength({min: 4, max: 16}),
  body('email').isEmail(),
  body('password').isLength({min: 6, max: 16}),
  userController.registration
);

// http://localhost:5000/api/user/login
router.post('/login', userController.login)

// http://localhost:5000/api/user/logout
router.post('/logout', userController.logout)

// Для перезаписи access токена если он умер ( refresh отправляем и получаем access и refresh)
// http://localgost:5000/api/user/refresh
router.get('/refresh', userController.refresh)

module.exports = router;