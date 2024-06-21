const Router = require('express');
const rulesController = require('../controllers/rulesController');
const router = new Router();

// http://localhost:5000/api/rules/get-rules
router.get('/get-rules', rulesController.getRules);

module.exports = router;