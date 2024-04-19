const sequelize = require('../../db');
const { DataTypes } = require('sequelize');

const ArtifactDonate = sequelize.define('artifact-donate', {
  idName: {
    type: DataTypes.STRING, // Строковое значение
    allowNull: false, // Обязательно должно быть значение
    unique: true // Всегда уникальное
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  maxCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 64
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imageId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});


module.exports = ArtifactDonate;
