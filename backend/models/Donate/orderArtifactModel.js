const sequelize = require('../../db');
const { DataTypes } = require('sequelize');

const OrderArtifact = sequelize.define('order-artifact', {
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
  idArtifact: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  countArtifact: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
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
  }
}, {
  timestamps: true
});

module.exports = OrderArtifact;