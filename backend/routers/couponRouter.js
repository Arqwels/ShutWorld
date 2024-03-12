const Router = require('express');
const couponController = require('../controllers/couponController');

const router = new Router();

// http://localhost:5000/api/coupon/check-coupon
router.post('/check-coupon', couponController.checkCoupone);

module.exports = router;