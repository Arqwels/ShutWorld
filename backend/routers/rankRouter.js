const Router = require('express');
const getRanksController = require('../controllers/getRanksController');
const router = new Router();

// http://localhost:5000/api/rank/get-ranks
router.get('/get-ranks', getRanksController.getRanks)

module.exports = router;