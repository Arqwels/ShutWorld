const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const RulesTitle = sequelize.define('rules_title', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // primaryKey=Уникальный идентификатор
    autoIncrement: true // autoIncrement=Каждый раз будет увеличиваться
  },
  idTitle: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true // Каждый id заголовка должен быть уникальным
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false // Не добавляем столбцы createdAt и updatedAt
});

const RulesText = sequelize.define('rules_text', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // primaryKey=Уникальный идентификатор
    autoIncrement: true // autoIncrement=Каждый раз будет увеличиваться
  },
  sequence_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Каждый id текста должен быть уникальным
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  punishment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  idTitle: {
    type: DataTypes.INTEGER,
    references: {
      model: RulesTitle,
      key: 'idTitle'
    },
    allowNull: false
  }
}, {
  timestamps: false, // Не добавляем столбцы createdAt и updatedAt
  indexes: [
    {
      unique: true,
      fields: ['idTitle', 'sequence_number']
    }
  ]
});

// Установка ассоциаций
RulesTitle.hasMany(RulesText, { foreignKey: 'idTitle', as: 'texts' });
RulesText.belongsTo(RulesTitle, { foreignKey: 'idTitle' });

module.exports = { RulesTitle, RulesText };