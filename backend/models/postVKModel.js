const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const PostVK = sequelize.define('PostVK', {
  postNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
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