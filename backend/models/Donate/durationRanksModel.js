const sequelize = require('../../db');
const { DataTypes } = require('sequelize');

const DurationDonate = sequelize.define('duration-donate', {
  duration: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  labelDuration: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rankId: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = DurationDonate;