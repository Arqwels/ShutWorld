require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const sequelize = require('./db')
const router = require('./routers/index')
const errorMiddleware = require('./middleware/errorMiddleware')
const postVKController = require('./controllers/postVKController')

const PORT = process.env.PORT || 2000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))
app.use('/api', router)

// Обработка ошибок, последним должен быть Middleware
app.use(errorMiddleware)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту - ${PORT}`)
      
      const interval = 60 * 60 * 1000;
      setInterval(async () => {
        try {
          await postVKController.savePost();
          console.log("Данные о постах ВК были полученны!");
        } catch (error) {
          console.error('⛔ Ошибка:', error);
        }
      }, interval);
    });
  } catch (error) {
    console.log(`⛔ Ошибка с подключение к БД - ${error}`)
  }
}

start()