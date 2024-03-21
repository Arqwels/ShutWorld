const Router = require('express');
const router = new Router();
const couponController = require('../controllers/couponController');

// http://localhost:5000/api/coupon/check-coupon
router.post('/check-coupon', couponController.checkCoupone);

module.exports = router;