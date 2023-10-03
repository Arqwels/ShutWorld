const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // primaryKey=Уникальный идентификатор, autoIncrement=Каждый раз будет увеличиваться 
  nickname: {type: DataTypes.STRING, unique: true, allowNull: false}, // unique=Уникальное значение 
  email: {type: DataTypes.STRING, allowNull: false},
  password: {type: DataTypes.STRING, allowNull: false},
  useragreement: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false}, // defaultValue=Устанавливает значение по умолчанию
  isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
  activationLink: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "USER"}, // defaultValue=Устанавливает значение по умолчанию
})

module.exports = User;