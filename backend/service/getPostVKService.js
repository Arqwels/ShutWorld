const { VK } = require('vk-io');
const postVKModel = require('../models/postVKModel');
const ApiError = require('../error/api-error');
const vk = new VK({
  token: "738575e8738575e8738575e83a7091a24e77385738575e81722a7bcdeae262f7ec4d801"
});

class getPostVKService {
  async getPostVK () {
    const data = await vk.api.wall.get({
      owner_id: -221465919,
      count: 6
    });
    if (!data || !data.items) {
      throw ApiError.ErrorReceivingData("Ошибка при получении внешних данных!");
    }
    const posts = data.items;
    const formattedPosts = posts.map((post, index) => {
      const formattedPost = {
        postNumber: index + 1,
        text: post.text,
        likesCount: post.likes.count,
        commentsCount: post.comments.count,
        repostsCount: post.reposts.count,
        date: new Date(post.date * 1000).toLocaleString(),
      };
      return formattedPost;
    });
    return formattedPosts;
  };
  
  async savePostData(data) {
    try {
      const existingPosts = await postVKModel.findAll();
      await Promise.all(
        data.map(async (newPost) => {
          const existingPost = existingPosts.find((post) => post.postNumber === newPost.postNumber);
          if(existingPost) {
            await existingPost.update(newPost);
          } else {
            await postVKModel.create(newPost);
          }
        })
      );
    } catch (error) {
      throw ApiError.ErrorSaveData("Ошибка при сохранении ВК Постов!", error);
    }
  };
}

module.exports = new getPostVKService();