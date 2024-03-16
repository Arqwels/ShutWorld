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
    const formattedPosts = posts.map(post => {
      const [title, ...contentLines] = post.text.split(/\n+/);
      const content = contentLines.join('\n');
      const formattedPost = {
        postId: post.id,
        title: title.trim(),
        text: content.trim(),
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
      for (const newPost of data) {
        const existsPost = await postVKModel.findOne({ where: { postId: newPost.postId } });
        if (existsPost) {
          await existsPost.update(newPost);
        } else {
          await postVKModel.create(newPost);
        }
      }
      return { success: true };
    } catch (error) {
      throw new ApiError("Ошибка при сохранении ВК Постов!", error);
    }
  };  
}

module.exports = new getPostVKService();