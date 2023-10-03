import React from 'react';
import { Link } from 'react-router-dom';

import '../css/footer.css';
import cubeFooter from '../images/cube-footer.png';
import { DS_LINK, PLAY_ROUTE, RULES_ROUTE, SHOP_ROUTE, VK_LINK } from '../utils/consts';


const Footer = () => {
  return (
  <footer>
    <div className="container">

    <section className="footer">
      <div className="footer__logo">
        <img src={cubeFooter} alt="cube-footer" />
        <h2>SHUT<br/>WORLD</h2>
      </div>
      <div className="footer__links">
        <ul className="footer__link__socialNetwork">
          <li>Обратная связь:</li>
          <li><Link to={VK_LINK} target="_blank">Вконтакте</Link></li>
          <li><Link to={DS_LINK} target="_blank">Discord</Link></li>
        </ul>
        <ul className="footer__links__url">
          <li>Ссылки:</li>
          <li><Link to={RULES_ROUTE}>Правила</Link></li>
          <li><Link to={SHOP_ROUTE}>Магазин</Link></li>
          <li><Link to={PLAY_ROUTE}>Как начать играть?</Link></li>
          <li><Link to="#">Пользовательское соглашение</Link></li>
        </ul>
      </div>
    </section>

    <div className="yearCreation">
      <h3>© 2022   SHUTWORLD</h3>
      <p>Проект ShutWorld не относится к Mojang Studios.</p>
    </div>

    </div>

  </footer>
  )
}

export default Footer