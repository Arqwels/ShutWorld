const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const User = require('./userModel');

const Token = sequelize.define('token', {
  refreshToken: { type: DataTypes.STRING, allowNull: false }
});

Token.belongsTo(User, { foreignKey: 'id' });

module.exports = Token;
