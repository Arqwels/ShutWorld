const express = require('express');
const { VK } = require('vk-io');
const vk = new VK({
  token: "738575e8738575e8738575e83a7091a24e77385738575e81722a7bcdeae262f7ec4d801"
});

const app = express();

async function getPostVK() {
  

    try {
      const response = await vk.api.wall.get({
        owner_id: -221465919,
        count: 6
      });
    
      console.log(response);
  
      if (response.items) {
        const posts = response.items;
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
      } else {
        throw new Error('Ошибка при получении данных');
      }
      
    } catch (error) {
      console.error(error);
      throw new Error('Ошибка при выполнении запроса');
    }
  
}



app.get('/', async (req, res) => {
  try {
    const posts = await getPostVK();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




app.listen(3005, () => {
  console.log('Сервер запущен на порту 3005');
});