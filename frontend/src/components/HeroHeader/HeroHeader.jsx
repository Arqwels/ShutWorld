import React from 'react';
import { Link } from "react-router-dom";

import '../../css/header.scss';
import style from './Hero.module.scss';

import endship from '../../images/endShip.svg';
import { PLAY_ROUTE } from '../../utils/consts';

const HeroHeader = () => {
  return (
    <div className="header container">

      <div className={style.blockLeft}>
        <div className={style.blockIp}>
          <p>IP: net.shutw.ru</p>
        </div>
        <h1 className={style.blockTitle}>SHUTWORLD</h1>
        <p className={style.blockText}>Выживание с элементами РПГ. На нашем сервере уникальная система мобов и предметов отличающаяся от большинства серверов и не только.</p>
        <div className={style.blockInfo}>
          <div className={style.blockLinkPlay}>
            <Link to={PLAY_ROUTE}>Начать играть</Link>
          </div>
          <div className={style.blockInfoOnline}>
            <p>10</p>
          </div>
        </div>
      </div>

      <img src={endship} alt="" className={style.blockRight} />

    </div>
  )
}

export default HeroHeader