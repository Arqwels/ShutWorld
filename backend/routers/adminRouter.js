const Router = require ('express');
const router = new Router();

const roleMiddleware = require('../middleware/roleMiddleware');

const adminController = require('../controllers/admin/adminController');
const ranksController = require('../controllers/admin/ranksController');
const imageController = require('../controllers/admin/imageController');

// http://localhost:5000/api/admin/get-users
router.get('/get-users', roleMiddleware(["ADMIN"]), adminController.getUsers);
// http://localhost:5000/api/admin/add-role
router.post('/add-role', roleMiddleware(["ADMIN"]), adminController.addRoleToUser);
// http://localhost:5000/api/admin/del-role
router.post('/del-role', roleMiddleware(["ADMIN"]), adminController.removeRoleFromUser);


// Ranks 
router.get('/get-all-ranks', ranksController.getAllRanks);

router.post('/upload-img', imageController.uploadImg);

router.get('/send-img/:filename', imageController.sendImg);

router.post('/img-send', imageController.sendImage);

// http://localhost:5000/api/admin/add-rank
router.post('/add-rank', roleMiddleware(["ADMIN"]), ranksController.addRank);

module.exports = router;