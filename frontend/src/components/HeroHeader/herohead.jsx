import React from 'react';
import { Link } from "react-router-dom";

import '../../css/header.scss';

import style from './Hero.module.scss';

import endship from '../../images/endShip.svg';

const HeroHeader = () => {
  return (
    <div className="header container">

      <div className="header__left">
        <div className="header__left-ip">
          <p>IP: net.shutw.ru</p>
        </div>
        <h1 className="header__left-title">SHUTWORLD</h1>
        <p className="header__left-text">Выживание с элементами РПГ. На нашем сервере уникальная система мобов и предметов отличающаяся от большинства серверов и не только.</p>
        <div className="header__left__inf">
          <div className="header__left__inf-play">
            <Link to="/howplay">Начать играть</Link>
          </div>
          <div className="header__left__inf-online">
            <p>10</p>
          </div>
        </div>
      </div>

      <img src={endship} alt="" className="header__right" />

    </div>
  )
}

export default HeroHeader