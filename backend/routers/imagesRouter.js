const imageController = require('../controllers/admin/imageController');
const Router = require('express').Router;
const router = new Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// http://localhost:5000/api/images/upload
router.post('/upload', upload.single('photo'), imageController.uploadImg);
// http://localhost:5000/api/images/:id
router.get('/:id', imageController.gettingPhoto);

module.exports = router;