const { Sequelize } = require('sequelize');

// module.exports = new Sequelize(
//   process.env.DB_NAME, // database = Название БД
//   process.env.DB_USER, // username = Пользователь
//   process.env.DB_PASSWORD, // password = Пароль БД
//   {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
// });

import pg from 'pg';
module.exports = new Sequelize(
  process.env.DB_NAME, // database = Название БД
  process.env.DB_USER, // username = Пользователь
  process.env.DB_PASSWORD, // password = Пароль БД
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectModule: pg,
    ssl: true,  // Включение SSL
    dialectOptions: {
      ssl: {
        require: true,  // Установка sslmode=require
      },
    },
});