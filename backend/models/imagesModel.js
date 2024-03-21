const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const RankDonate = require('./Donate/ranksModel');

const Image = sequelize.define('image', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.BLOB('long'),
    allowNull: false,
  },
}, {
  timestamps: false
});

Image.hasMany(RankDonate, { foreignKey: 'imageId' })

module.exports = Image;
