const Router = require ('express');
const router = new Router();
const postVKController = require('../controllers/postVKController');

// http://localhost:5000/api/post/get-post-vk
router.get('/get-post-vk', postVKController.sendVKData);
// http://localhost:5000/api/post/receive-post-vk
router.get('/receive-post-vk', postVKController.receivePost);
// http://localhost:5000/api/post/save-post-vk
router.get('/save-post-vk', postVKController.savePost);

module.exports = router;