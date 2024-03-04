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
  imageUrl: DataTypes.STRING
}, {
  timestamps: false
});

RankDonate.hasMany(DurationDonate, { foreignKey: 'rankId' })

module.exports = RankDonate;
