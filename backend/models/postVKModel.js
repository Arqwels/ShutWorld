const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const PostVK = sequelize.define('vk-post', {
  postId: {
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
  },
  text: {
    type: DataTypes.TEXT,
  },
  likesCount: {
    type: DataTypes.INTEGER,
  },
  commentsCount: {
    type: DataTypes.INTEGER,
  },
  repostsCount: {
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATE,
  },
});

module.exports = PostVK;