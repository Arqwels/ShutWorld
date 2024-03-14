require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const sequelize = require('./db')
const router = require('./routers/index')
const errorMiddleware = require('./middleware/errorMiddleware')
const fileUpload = require('express-fileupload')
const path = require('path')

const PORT = process.env.PORT || 2000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL || process.env.RPODUCTION_CLIENT_URL
}))
app.use('/api', router)

app.use(fileUpload());

const RankDonate = require("./models/Donate/ranksModel");
const DurationDonate = require("./models/Donate/durationRanksModel");

app.use(express.static('upload'));

// Обработка ошибок, последним должен быть Middleware
app.use(errorMiddleware)

const Coupons = require('./models/Donate/couponsModel');

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync();

    // const createCoupon = async () => {
    //   try {
    //     const newCoupon = await Coupons.create({
    //       code: 'Vector', // Код купона
    //       discount: 95, // Скидка (например, 10%)
    //       expiry_date: new Date('2023-05-25'), // Дата истечения срока действия купона
    //     });
    
    //     console.log('Новый купон создан:', newCoupon.toJSON());
    //   } catch (error) {
    //     console.error('Ошибка при создании купона:', error);
    //   }
    // };
    
    // createCoupon();


    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту - ${PORT}`)
    });
    
  } catch (error) {
    console.log(`⛔ Ошибка с подключение к БД - ${error}`)
  }
}

start();