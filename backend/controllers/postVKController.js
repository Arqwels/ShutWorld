const ApiError = require('../error/api-error');
const PostVK = require('../models/postVKModel');
const getPostVKService = require('../service/getPostVKService');

class PostController {
  async getPost() {
    try {
      const postData = await getPostVKService.getPostVK();
      await getPostVKService.savePostData(postData);
    } catch (error) {
      throw ApiError.ErrorReceivingData("Ошибка в получении Постов ВК!", error);
    }
  };

  async sendVKData(req, res, next) {
    try {
      const posts = await PostVK.findAll();
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ error: "Ошибка при отправки постов ВК!"});
    }
  }
};

module.exports = new PostController();