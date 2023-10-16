import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../index.scss'

import Slider from '../components/Store/Slider';
import Modal from '../components/Store/Modal';
import Footer from '../components/Footer';
import Modal2 from '../components/Store/Modal';
import Modal3 from '../components/Store/Modal';

import donate1ssImg from '../images/Vector.png';
import donate2ssImg from '../images/Vector2.png';
import donate3ssImg from '../images/Vector3.png';
import donate1ItemImg from '../images/donat-item1.png';
import DurationSelect from '../components/Shop/DurationSelect';


const Store = () => {
  const [ modalDonate1ss, setModalDonate1ss ] = useState(false);
  const [ modalDonate2ss, setModalDonate2ss ] = useState(false);
  const [ modalDonate3ss, setModalDonate3ss ] = useState(false);

  return (
    <>
      <main>
        <Slider />

        <section className='container'>
          <div className="donate">
            <h2>Ранги</h2>
            <div className="donate__container">
              <div className="donate__item">
                <img className="donate__item__img" src={donate1ssImg} alt="" />
                <div className="donate__item__text">
                  <h2>Гладиатор <br/>от <span>100</span>₽</h2>
                  <button onClick={() => setModalDonate1ss(true)} className="modal__button button button-type_primary button-width">Приобрести</button>
                </div>
              </div>
              <div className="donate__item">
                <img className="donate__item__img" src={donate2ssImg} alt="" />
                <div className="donate__item__text">
                  <h2>Паладин <br/>от <span>165</span>₽</h2>
                  <button onClick={() => setModalDonate2ss(true)} className="modal__button button button-type_primary button-width">Приобрести</button>
                </div>
              </div>
              <div className="donate__item">
                <img className="donate__item__img" src={donate3ssImg} alt="" />
                <div className="donate__item__text">
                  <h2>Вождь <br/>от <span>240</span>₽</h2>
                  <button onClick={() => setModalDonate3ss(true)} className="modal__button button button-type_primary button-width">Приобрести</button>
                </div>
              </div>
            </div>
          </div>
          <div className="donate">
            <h2>Артефакты</h2>
            <div className="donate__container">
              <div className="donate__item">
                <img className="donate__item__img" src={donate1ItemImg} alt="" />
                <div className="donate__item__text">
                  <h2>Осколок Души <br/><span>39</span>₽</h2>
                  <button className="modal__button button button-type_primary button-width">Приобрести</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* setModalDonate1ss */}
        <Modal active={modalDonate1ss} setActive={setModalDonate1ss}>
          <div className="modal__body">
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
                      <label className="description__text" for="nickname">Никнейм</label>
                      <input className="button__form" type="text" name="name" required placeholder="Введите свой никнейм" />
                    </div>
                    <div className="block__form">
                      <label className="description__text" for="coupon">Купон</label>
                      <input className="button__form" type="text" name="name" required placeholder="Введите купион, если имеется" />
                    </div>
                    <div className="block__form">
                      <label className="description__text" for="duration">Длительность</label>
                      <duration duration-name="dur" className="select" style={{zIndex:10}}>
                        <div duration-header className="select__header">
                          <div duration-value className="select__header-value select__text-normal">Выберите на сколько возьмёте</div>
                          <div duration-property="price" className="select__header-price select__text-bold"></div>
                          <img src="images/select-icon.svg" alt="" className="select__header-icon" />
                        </div>
                        <div duration-box className="select__body">
                          <div duration-item="1" className="select__body__item">
                            <div duration-value className="select__body__item-value select__text-normal">1 месяц</div>
                            <div duration-property="price" className="select__body__item-value select__text-bold">100₽</div>
                          </div>
                          <div duration-item="2" className="select__body__item">
                            <div duration-value className="select__body__item-value select__text-normal">3 месяца</div>
                            <div duration-property="price" className="select__body__item-value select__text-bold">200₽</div>
                          </div>
                          <div duration-item="3" className="select__body__item">
                            <div duration-value className="select__body__item-value select__text-normal">Навсегда</div>
                            <div duration-property="price" className="select__body__item-value select__text-bold">480₽</div>
                          </div>
                        </div>
                      </duration>
                    </div>
                    <div className="block__form">
                      <label className="description__text" for="payMethod">Способ оплаты</label>
                      <duration duration-name="dur" className="select" style={{zIndex:9}}>
                        <div duration-header className="select__header">
                          <div duration-value className="select__header-value select__text-normal">Выберите способ оплаты</div>
                          <div duration-property="price" className="select__header-price select__text-bold"></div>
                          <img src="images/select-icon.svg" alt="" className="select__header-icon" />
                        </div>
                        <div duration-box className="select__body">
                          <div duration-item="1" className="select__body__item">
                            <div duration-value className="select__body__item-value select__text-normal">QIWI</div>
                            <div duration-property="price" className="select__body__item-value select__text-bold">Комиссия 3%</div>
                          </div>
                          <div duration-item="2" className="select__body__item">
                            <div duration-value className="select__body__item-value select__text-normal">Банковская карта</div>
                            <div duration-property="price" className="select__body__item-value select__text-bold">Комиссия 0%</div>
                          </div>
                          <div duration-item="3" className="select__body__item">
                            <div duration-value className="select__body__item-value select__text-normal">Bitcoin</div>
                            <div duration-property="price" className="select__body__item-value select__text-bold">Комиссия 5%</div>
                          </div>
                        </div>
                      </duration>
                    </div>
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
          </div>
        </Modal>
        {/* setModalDonate2ss */}
        <Modal2 active={modalDonate2ss} setActive={setModalDonate2ss}>
          <div className="modal__body">
            <div className="modal__content">
              <div className="blocks">
                <div className="block__description">
                  <h2 className="block__title">Описание - Паладин</h2>
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
                      <label className="description__text" for="nickname">Никнейм</label>
                      <input className="button__form" type="text" name="name" required placeholder="Введите свой никнейм" />
                    </div>
                    <div className="block__form">
                      <label className="description__text" for="coupon">Купон</label>
                      <input className="button__form" type="text" name="name" required placeholder="Введите купион, если имеется" />
                    </div>
                    <div className="block__form">
                      <label className="description__text" for="duration">Длительность</label>
                      <duration duration-name="dur" className="select" style={{zIndex:10}}>
                        <div duration-header className="select__header">
                          <div duration-value className="select__header-value select__text-normal">Выберите на сколько возьмёте</div>
                          <div duration-property="price" className="select__header-price select__text-bold"></div>
                          <img src="images/select-icon.svg" alt="" className="select__header-icon" />
                        </div>
                        <div duration-box className="select__body">
                          <div duration-item="1" className="select__body__item">
                            <div duration-value className="select__body__item-value select__text-normal">1 месяц</div>
                            <div duration-property="price" className="select__body__item-value select__text-bold">165₽</div>
                          </div>
                          <div duration-item="2" className="select__body__item">
                            <div duration-value className="select__body__item-value select__text-normal">3 месяца</div>
                            <div duration-property="price" className="select__body__item-value select__text-bold">330₽</div>
                          </div>
                          <div duration-item="3" className="select__body__item">
                            <div duration-value className="select__body__item-value select__text-normal">Навсегда</div>
                            <div duration-property="price" className="select__body__item-value select__text-bold">980₽</div>
                          </div>
                        </div>
                      </duration>
                    </div>
                    <div className="block__form">
                      <label className="description__text" for="payMethod">Способ оплаты</label>
                      <duration duration-name="dur" className="select" style={{zIndex:9}}>
                        <div duration-header className="select__header">
                          <div duration-value className="select__header-value select__text-normal">Выберите способ оплаты</div>
                          <div duration-property="price" className="select__header-price select__text-bold"></div>
                          <img src="images/select-icon.svg" alt="" className="select__header-icon" />
                        </div>
                        <div duration-box className="select__body">
                          <div duration-item="1" className="select__body__item">
                            <div duration-value className="select__body__item-value select__text-normal">QIWI</div>
                            <div duration-property="price" className="select__body__item-value select__text-bold">Комиссия 3%</div>
                          </div>
                          <div duration-item="2" className="select__body__item">
                            <div duration-value className="select__body__item-value select__text-normal">Банковская карта</div>
                            <div duration-property="price" className="select__body__item-value select__text-bold">Комиссия 0%</div>
                          </div>
                          <div duration-item="3" className="select__body__item">
                            <div duration-value className="select__body__item-value select__text-normal">Bitcoin</div>
                            <div duration-property="price" className="select__body__item-value select__text-bold">Комиссия 5%</div>
                          </div>
                        </div>
                      </duration>
                    </div>
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
          </div>
        </Modal2>
        {/* setModalDonate3ss */}
        <Modal3 active={modalDonate3ss} setActive={setModalDonate3ss}>
          <div className="modal__body">
            <div className="modal__content">
              <div className="blocks">
                <div className="block__description">
                  <h2 className="block__title">Описание - Вождь</h2>
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
                      <label className="description__text" for="nickname">Никнейм</label>
                      <input className="button__form" type="text" name="name" required placeholder="Введите свой никнейм" />
                    </div>
                    <div className="block__form">
                      <label className="description__text" for="coupon">Купон</label>
                      <input className="button__form" type="text" name="name" required placeholder="Введите купион, если имеется" />
                    </div>
                    <DurationSelect />
                    <div className="block__form">
                      <label className="description__text" for="payMethod">Способ оплаты</label>
                      <duration duration-name="dur" className="select" style={{zIndex:9}}>
                        <div duration-header className="select__header">
                          <div duration-value className="select__header-value select__text-normal">Выберите способ оплаты</div>
                          <div duration-property="price" className="select__header-price select__text-bold"></div>
                          <img src="images/select-icon.svg" alt="" className="select__header-icon" />
                        </div>
                        <div duration-box className="select__body">
                          <div duration-item="1" className="select__body__item">
                            <div duration-value className="select__body__item-value select__text-normal">QIWI</div>
                            <div duration-property="price" className="select__body__item-value select__text-bold">Комиссия 3%</div>
                          </div>
                          <div duration-item="2" className="select__body__item">
                            <div duration-value className="select__body__item-value select__text-normal">Банковская карта</div>
                            <div duration-property="price" className="select__body__item-value select__text-bold">Комиссия 0%</div>
                          </div>
                          <div duration-item="3" className="select__body__item">
                            <div duration-value className="select__body__item-value select__text-normal">Bitcoin</div>
                            <div duration-property="price" className="select__body__item-value select__text-bold">Комиссия 5%</div>
                          </div>
                        </div>
                      </duration>
                    </div>
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
          </div>
        </Modal3>
      </main>
      <Footer />
      <div className="basket">Корзина</div>
    </>
  )
}

export default Store