import React from 'react'

import whyAreWe from '../../images/whywe.svg'

const Advantages = () => {
  return (
    <section className="advantages container">
      <h2 className="advantages__head">Почему мы?</h2>
      <div className="advantages__body">
        <img src={whyAreWe} alt="imageWhyAreWe" className="advantages__bodyImg" width="488px" height="435px" />
        <ul className="advantages__body-text">
          <li>Мощнейшее оборудование</li>
          <li>Постоянные обновления</li>
          <li>Часто проводим эвенты с игроками</li>
          <li>Уникальность сервера не даёт заскучать</li>
        </ul>
      </div>
    </section>
  )
}

export default Advantages