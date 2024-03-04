require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const sequelize = require('./db')
const router = require('./routers/index')
const errorMiddleware = require('./middleware/errorMiddleware')
const fileUpload = require('express-fileupload')

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

// Обработка ошибок, последним должен быть Middleware
app.use(errorMiddleware)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync();
    // await RankDonate.create({
    //   id: "3ss",
    //   name: "Names",
    //   description: "Descriptions",
    //   privilege: "Privilege"
    // })

    // await DurationDonate.create({
    //   duration: 1000,
    //   labelDuration: 'Example Label',
    //   price: 2510,
    // });

    // await RankDonate.bulkCreate([
    //   {
    //     id: '1ss',
    //     name: 'Гладиатор',
    //     description: "Префикс в чате, табе и над головой - &a✇. Награда 'Дней/Опыт, серебро': (30/20 уровней опыта и 2000 серебра); (60/40 уровней опыта и 4000 серебра); (навсегда/60 уровней опыта и 6000 серебра).",
    //     privilege: [
    //       "Права обычных рангов: 1, 2, 3",
    //       "Слоты на Торговой Площадке: 20",
    //       "Выпадение серебра с мобов, боссов: +30%",
    //       "Специальный набор предметов в /kit",
    //       "Сохранение опыта при смерти",
    //       "Восстановить голод /feed (кд: 120 сек.)",
    //       "Вернуться на место смерти /dback (кд: 10 мин.)",
    //       "Одеть блок (предмет) на голову /hat",
    //       "Запуск с места для полёта на элитрах, держа в руке перо, удерживайте Shift + Пкм",
    //       "Точек дома (/sethome): 4",
    //       "Регион: 200000 блок. / 4 региона",
    //       "Флаги на регион: entry, fall-damage, entry-deny-message"
    //     ],
    //     imageUrl: "test.png"
    //   },
    //   {
    //     id: '2ss',
    //     name: 'Паладин',
    //     description: "Префикс в чате, табе и над головой - [&b☬]. Награда 'Дней/Опыт, серебро': (30/40 уровней опыта и 4000 серебра); (60/60 уровней опыта и 6000 серебра); (навсегда/80 уровней опыта и 8000 серебра).",
    //     privilege: [
    //       "Права обычных рангов: 1, 2, 3, 4",
    //       "Слоты на Торговой Площадке: 24",
    //       "Выпадение серебра с мобов, боссов: +50%",
    //       "Дополнительный опыт в 'Общие умения': +10%",
    //       "Специальный набор предметов в /kit",
    //       "Вход на переполненный сервер",
    //       "Потушить себя /ext (кд: 120 сек.)",
    //       "Вернуться на предыдущее место до тп. /back (кд: 25 сек.)",
    //       "Ремонт предмета в руке /fix (кд: 6 ч.)",
    //       "Очистка инвентаря /ci",
    //       "Точек дома (/sethome): 4",
    //       "Регион: 250000 блок. / 5 регионов",
    //       "Флаги на регион: snowman-trails, time-lock, ice-form"
    //     ],
    //     imageUrl: "test2.png"
    //   },
    //   {
    //     id: '3ss',
    //     name: 'Вождь',
    //     description: "Префикс в чате, табе и над головой - [&e⚡]. Награда 'Дней/Опыт, серебро': (30/60 уровней опыта и 6000 серебра); (60/80 уровней опыта и 8000 серебра); (навсегда/100 уровней опыта и 10000 серебра).",
    //     privilege: [
    //       "Права обычных рангов: 1, 2, 3, 4, 5",
    //       "Слоты на Торговой Площадке: 28",
    //       "Выпадение серебра с мобов, боссов: +70%",
    //       "Дополнительный опыт в 'Общие умения': +25%",
    //       "Специальный набор предметов в /kit",
    //       "Исцелить и восстановить голод /heal (кд: 120 сек.)",
    //       "Ремонт предметов в инвентаре /fixall (кд: 24 ч.)",
    //       "Телепортация на точку (80 бл.) /jump (кд: 25 сек.)",
    //       "Телепортация на высшую точку над вами /top (кд: 25 сек.)",
    //       "Изменить время суток (для себя) /ptime",
    //       "Точек дома (/sethome): 5",
    //       "Регион: 300000 блок. / 6 регионов",
    //       "Флаги на регион: mob-spawning, ice-melt"
    //     ],
    //     imageUrl: "test3.png"
    //   },
    // ])

    // await DurationDonate.bulkCreate([
    //   {
    //     duration: 2592000,
    //     labelDuration: "1 месяц",
    //     price: 98,
    //     rankId: "1ss"
    //   },
    //   {
    //     duration: 7776000,
    //     labelDuration: "3 месяц",
    //     price: 259,
    //     rankId: "1ss"
    //   },
    //   {
    //     duration: 99999999999,
    //     labelDuration: "Навсегда",
    //     price: 559,
    //     rankId: "1ss"
    //   },

    //   {
    //     duration: 2592000,
    //     labelDuration: "1 месяц",
    //     price: 165,
    //     rankId: "2ss"
    //   },
    //   {
    //     duration: 7776000,
    //     labelDuration: "3 месяц",
    //     price: 459,
    //     rankId: "2ss"
    //   },
    //   {
    //     duration: 99999999999,
    //     labelDuration: "Навсегда",
    //     price: 989,
    //     rankId: "2ss"
    //   },

    //   {
    //     duration: 2592000,
    //     labelDuration: "1 месяц",
    //     price: 240,
    //     rankId: "3ss"
    //   },
    //   {
    //     duration: 7776000,
    //     labelDuration: "3 месяц",
    //     price: 659,
    //     rankId: "3ss"
    //   },
    //   {
    //     duration: 99999999999,
    //     labelDuration: "Навсегда",
    //     price: 1489,
    //     rankId: "3ss"
    //   }
    // ])

    



    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту - ${PORT}`)
    });
    
  } catch (error) {
    console.log(`⛔ Ошибка с подключение к БД - ${error}`)
  }
}

start();