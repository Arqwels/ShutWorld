const Router = require ('express');
const router = new Router();
const roleMiddleware = require('../middleware/roleMiddleware');
const adminController = require('../controllers/admin/adminController');
const ranksController = require('../controllers/admin/ranksController');
const artifactController = require('../controllers/admin/artifactController');
const multer = require('multer');
const couponController = require('../controllers/admin/couponController');
const adminRulesController = require('../controllers/admin/adminRulesController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

// http://localhost:5000/api/admin/add-rank
router.post('/add-rank', upload.single('photo'), roleMiddleware(["ADMIN"]), ranksController.addRank);

// http://localhost:5000/api/admin/delete-rank/(1ss)
router.delete('/delete-rank/:rankId', roleMiddleware(["ADMIN"]), ranksController.deleteRank);

// http://localhost:5000/api/admin/update-rank
router.put('/update-rank', roleMiddleware(["ADMIN"]), ranksController.updateRank);

// Artifact

// http://localhost:5000/api/admin/add-artifact
router.post('/add-artifact', upload.single('photo'), roleMiddleware(["ADMIN"]), artifactController.addArtifact);

// http://localhost:5000/api/admin/delete-artifact/{artifactIdName}
router.delete('/delete-artifact/:artifactId', roleMiddleware(["ADMIN"]), artifactController.deleteArtifact);

// http://localhost:5000/api/admin/update-artifact
router.put('/update-artifact', artifactController.updateArtifact);

// Coupon

// http://localhost:5000/api/admin/add-coupon
router.post('/add-coupon', roleMiddleware(["ADMIN"]), couponController.createCoupon);


// Rules

// http://localhost:5000/api/admin/create-rules-title
router.post('/create-rules-title', adminRulesController.createrTitleRules);

// http://localhost:5000/api/admin/create-rules-text
router.post('/create-rules-text', adminRulesController.createrTextRules);


module.exports = router;