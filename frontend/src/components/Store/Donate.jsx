import React from 'react'

const Donate = () => {
  return (
    <sectiontion>
      <div class="donate">
        <h2>Ранги</h2>
        <div class="donate__container">
          <div class="donate__item">
            <img class="donate__item__img" src="images/Vector.png" alt=""/>
            <div class="donate__item__text">
              <h2>Гладиатор <br/>от <span>100</span>₽</h2>
              <button href="#modal-1ss" class="modal__button button button-type_primary button-width">Приобрести</button>
            </div>
          </div>
          <div class="donate__item">
            <img class="donate__item__img" src="images/Vector2.png" alt=""/>
            <div class="donate__item__text">
              <h2>Паладин <br/>от <span>165</span>₽</h2>
              <button href="#modal-2ss" class="modal__button button button-type_primary button-width">Приобрести</button>
            </div>
          </div>
          <div class="donate__item">
            <img class="donate__item__img" src="images/Vector3.png" alt=""/>
            <div class="donate__item__text">
              <h2>Вождь <br/>от <span>244</span>₽</h2>
              <button href="#modal-3ss" class="modal__button button button-type_primary button-width">Приобрести</button>
            </div>
          </div>
        </div>
      </div>
      <div class="donate">
        <h2>Артефакты</h2>
        <div class="donate__container">
          <div class="donate__item">
            <img class="donate__item__img" src="images/donat-item1.png" alt=""/>
            <div class="donate__item__text">
              <h2>Осколок Души <br/><span>39</span>₽</h2>
              <button class="modal__button button button-type_primary button-width">Приобрести</button>
            </div>
          </div>
        </div>
      </div>
    </sectiontion>
  )
}

export default Donate