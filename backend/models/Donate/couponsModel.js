const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Coupons = sequelize.define('сoupon', {
  id: {
    type: DataTypes.INTEGER, // Используем INTEGER для идентификатора
    primaryKey: true,
    autoIncrement: true // Автоинкрементируемый первичный ключ
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Каждый код купона должен быть уникальным
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  expiry_date: {
    type: DataTypes.DATE, // Используем DATE для даты истечения срока действия
    allowNull: false
  }
}, {
  timestamps: false // Не добавляем столбцы createdAt и updatedAt
});

module.exports = Coupons;