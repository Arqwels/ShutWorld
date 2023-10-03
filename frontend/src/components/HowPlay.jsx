import React from 'react'
import { Link } from 'react-router-dom'

const HowPlayBlock = () => {
  return (
    <main className="container">
      <section className="howplay__head">
        <h2>Как начать играть?</h2>
        <p>просто листай вниз</p>
      </section>
      <section className="howplay__body">
        <ul className="howplay__body__items">
          <li>1. Скачиваем лаунчер <Link to="https://tlaun.ch" target="_blank">(https://tlaun.ch)</Link></li>
          <li>2. Придумываем и записываем никнейм</li>
          <li>3. Выбираем актуальную на данный момент версию 1.19.2</li>
          <li>4. Запускаем скачанный ранее лаунчер</li>
          <li>5. Ждём запуска minecraft</li>
          <li>6. Нажимаем на "Сетевая игра"</li>
          <li>7. Ищем кнопку "Добавить" и в "Адрес сервера" прописываем наш ip: <span>net.shutw.ru</span></li>
          <li>8. Подключаемся к добавленному серверу</li>
          <li>9. Затем регистрируемся на сервере, следуя командам из чата</li>
          <li>10. Желая помочь продвижению проекта и поддержки создателей сервера можете купить донат</li>
          <li>11. Напиши привет создателю <Link to="https://vk.com/id306939710" target="_blank">(vk.com/id306939710)</Link></li>
        </ul>
      </section>
    </main>
  )
}

export default HowPlayBlock