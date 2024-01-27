const postVKDto = require('../dtos/postVKDto');
const ApiError = require('../error/api-error');
const PostVK = require('../models/postVKModel');
const getPostVKService = require('../service/getPostVKService');

class PostController {
  async receivePost(req, res) {
    try {
      const posts = await getPostVKService.getPostVK();
      return res.status(200).json(posts);
    } catch (error) {
      throw ApiError.ErrorReceivingData("Ошибка в получении Постов ВК!", error);
    }
  };

  async savePost(res) {
    try {
      const postData = await getPostVKService.getPostVK();
      await getPostVKService.savePostData(postData);
      return res.status(200).json({success: true});
    } catch (error) {
      throw ApiError.ErrorReceivingData("Ошибка в получении Постов ВК!", error);
    }
  };

  async sendVKData(req, res) {
    try {
      let posts = await PostVK.findAll();
      if(posts.length === 0) {
        const postController = new PostController();
        await postController.savePost();
        posts = await PostVK.findAll();
      }
      const postsDto = posts.map(post => new postVKDto(post));
      return res.status(200).json(postsDto);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
};

module.exports = new PostController();