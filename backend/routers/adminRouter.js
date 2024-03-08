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

// http://localhost:5000/api/admin/get-one-rank?rankId=1ss
router.get('/get-one-rank', roleMiddleware(["ADMIN"]), ranksController.getOneRank);

// http://localhost:5000/api/admin/send-img/(imageName)
router.get('/send-img/:filename', imageController.sendImg);

// http://localhost:5000/api/admin/add-rank
router.post('/add-rank', roleMiddleware(["ADMIN"]), ranksController.addRank);

// http://localhost:5000/api/admin/delete-rank/(1ss)
router.delete('/delete-rank/:rankId', roleMiddleware(["ADMIN"]), ranksController.deleteRank);

module.exports = router;