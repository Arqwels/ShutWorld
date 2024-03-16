const Router = require ('express');
const orderStatusController = require('../controllers/orderStatusController');
const router = new Router();

// http://localhost:5000/api/order/create-order-donate
router.post('/create-order-donate', orderStatusController.createOrderStatus);

module.exports = router;