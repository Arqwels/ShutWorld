const sequelize = require('../../db');
const { DataTypes } = require('sequelize');

const OrderRank = sequelize.define('order-donate', {
  id: {
    type: DataTypes.INTEGER, // Используем INTEGER для идентификатора
    primaryKey: true,
    autoIncrement: true // Автоинкрементируемый первичный ключ
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'processing'
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  couponText: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  couponPercent: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  priceDonate: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  orderDurationId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  paymentMethodLabel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAgreed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  idDonate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  weightDonate: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = OrderRank;
