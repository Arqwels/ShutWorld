import React from 'react'
import { Link } from "react-router-dom";
import { donate } from '../../DonateStatuses'
import DurationSelect from '../../DurationSelect'
import PaymentMethod from '../../PaymentMethod'

const Donate1ss = () => {
  return (
      <div className="modal__content">
        <div className="blocks">
          <div className="block__description">
            <h2 className="block__title">Описание - Гладиатор</h2>
            <div className="block__description-container">
              <div className="block__description-item">
                <p>Ранг «VIP» подойдёт для тех, кто начал играть на нашем сервере. Ранг имеет много возможностей за такую маленькую цену. Если Вам уже понравился данный ранг, то мы Вам посоветуем уже попробовать ранги получше, например, ранг «VIP+» или «PREMIUM». <br/>Возможности данного ранга написано ниже.</p>
              </div>
              <div className="block__description-row">
                <div className="block__description-item">
                  <p className="block__description-item__text">Возможности</p>
                  <ul className="block__description-list">
                    <li>Приватить более 10 регионов.</li>
                    <li>Приватить более 500.000 блоков.</li>
                    <li>Писать в чате разными цветами.</li>
                    <li>Особые эффекты.</li>
                    <li>Особые префиксы и титулы.</li>
                  </ul>
                </div>
                <div className="block__description-item">
                  <p className="block__description-item__text">Команды</p>
                  <ul className="block__description-list">
                    <li>/ban - Забанить всех донатеров на данном проекте.</li>
                    <li>/stop - Остановить сервер по прикольчику.</li>
                    <li>/lp - Выдать себе или другу какие-то права или звезду.</li>
                    <li>/op - Выдать опку другу.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="form">
            <h2 className="block__title">Покупка</h2>
            <form className="body__form block__description-item" method="get" action="#">
              <div className="block__form">
                <label className="description__text">Никнейм</label>
                <input className="button__form" type="text" name="name" required placeholder="Введите свой никнейм" />
              </div>
              <div className="block__form">
                <label className="description__text">Купон</label>
                <input className="button__form" type="text" name="name" required placeholder="Введите купион, если имеется" />
              </div>
              <DurationSelect donateStatus={donate["1ss"]} />
              <PaymentMethod />
              <div className="block__form__err">
                <img src="images/question-mark.svg" alt="" className="block__form__err-img" />
                <div className="block__form__err-text">
                  <p>Произошла какая-то ошибка или не можете оплатить? Тогда сообщите нам, мы поможем.</p>
                  <Link to="https://vk.com/shutw" target="_blank"><img src="images/icon-link-formvk.svg" alt="" />vk.com/shutw</Link>
                </div>
              </div>
              <div className="block__form__offer">
                <input type="checkbox" name="name" className="block__form__offer-checkbox" />
                <label className="block__form__offer-text">Ознакомился с <Link to="#" target="_blank">публичной офертой</Link></label>
              </div>
              <button disabled type="submit" className="button button-type_primary button-width">Данные не заполнены</button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default Donate1ss