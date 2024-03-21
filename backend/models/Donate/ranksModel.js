const sequelize = require('../../db');
const { DataTypes } = require('sequelize');
const DurationDonate = require('./durationRanksModel');

const RankDonate = sequelize.define('rank-donate', {
  id: {
    type: DataTypes.STRING, // Строковое значение
    primaryKey: true, // Первичный ключ
    allowNull: false, // Обязательно должно быть значение
    unique: true // Всегда уникальное
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  privilege: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: false
  },
  imageId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

RankDonate.hasMany(DurationDonate, { foreignKey: 'rankId' })

module.exports = RankDonate;
