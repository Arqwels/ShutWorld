const Router = require ('express');
const router = new Router();
const postVKController = require('../controllers/postVKController');

// http://localhost:5000/api/post/get-post-vk
router.get('/get-post-vk', postVKController.sendVKData);

module.exports = router;