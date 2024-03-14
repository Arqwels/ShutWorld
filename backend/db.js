const { Sequelize } = require('sequelize');
const pg = require('pg');
let sequelize;

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(
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
    }
  );
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME, // database = Название БД
    process.env.DB_USER, // username = Пользователь
    process.env.DB_PASSWORD, // password = Пароль БД
    {
      host: process.env.DB_HOST,
      dialect: 'postgres',
    }
  );
};

module.exports = sequelize;
