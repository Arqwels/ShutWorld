const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const RankDonate = require('./Donate/ranksModel');
const ArtifactDonate = require('./Donate/artifactModel');

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

Image.hasMany(ArtifactDonate, { foreignKey: 'imageId' })
Image.hasMany(RankDonate, { foreignKey: 'imageId' })

module.exports = Image;
