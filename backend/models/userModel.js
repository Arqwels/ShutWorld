const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // primaryKey=Уникальный идентификатор
    autoIncrement: true //autoIncrement=Каждый раз будет увеличиваться
  },
  nickname: {
    type: DataTypes.STRING,
    unique: true, // unique=Уникальное значение
    allowNull: false
  }, 
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  useragreement: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // defaultValue=Устанавливает значение по умолчанию
    allowNull: false
  },
  isActivated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  activationLink: {
    type: DataTypes.STRING
  },
  roles: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: ["USER"] // defaultValue=Устанавливает значение по умолчанию
  },
});

module.exports = User;