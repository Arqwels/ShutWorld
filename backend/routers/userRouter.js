const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const {body} = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

// http://localhost:5000/api/user/registration
router.post('/registration',
  body('nickname').isLength({min: 5, max: 16}),
  body('email').isEmail(),
  body('password').isLength({min: 6, max: 16}),
  userController.registration
);

// http://localhost:5000/api/user/login
router.post('/login',
  body('nickname').isLength({min: 5}),
  body('password').isLength({min: 6}),
  userController.login
);

// http://localhost:5000/api/user/logout
router.post('/logout', userController.logout)

// Для перезаписи access токена если он умер ( refresh отправляем и получаем access и refresh )
// http://localhost:5000/api/user/refresh
router.get('/refresh', userController.refresh)

// http://localhost:5000/api/user/get-mail-message
router.get('/get-mail-message', authMiddleware, userController.sendMailMessage);

// http://localhost:5000/api/user/change-password
router.post('/change-password', 
  body('oldPassword').isLength({min: 6}),
  body('newPassword').isLength({min: 6}),
  body('repeatedNewPassword').isLength({min: 6}),
  authMiddleware, 
  userController.changePassword
);

// http://localhost:5000/api/user/getting-order-history
router.get('/getting-order-history', authMiddleware, userController.gettingOrderHistory);

module.exports = router;