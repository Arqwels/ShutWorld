import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoTypeHeaderImg from '../../images/Logotype-header.png';
import BurgerSvg from '../../images/burger.svg';
import ClsBurgerSvg from '../../images/clouseBurger.svg';
import Menu from './Menu/Menu';
import style from './Navbar.module.scss';
import { AUTHORIZATION_ROUTE, MAIN_ROUTE, PLAY_ROUTE, RULES_ROUTE, SHOP_ROUTE } from '../../utils/consts';
import { Context } from '../..';
import ButtonAccount from './ButtonAccount';
import { observer } from 'mobx-react-lite';

const Navbar = () => {
  const [openBurger, setOpenBurger] = useState(true);
  const { store } = useContext(Context);
  const location = useLocation();

  //! Думаю в будующем пофиксить
  const items = [
    {
      id: 0,
      value: 'Главная',
      href: MAIN_ROUTE
    },
    // {
    //   id: 1,
    //   value: 'Как начать играть?',
    //   href: PLAY_ROUTE
    // },
    {
      id: 2,
      value: 'Магазин',
      href: SHOP_ROUTE
    },
    {
      id: 3,
      value: 'Правила',
      href: RULES_ROUTE
    }
  ];

  const handleBurgerClick = () => {
    setOpenBurger(!openBurger);
  };

  // Закрыть бургер-меню при изменении маршрута
  useEffect(() => {
    setOpenBurger(true);
  }, [location]);

  return (
    <header>
      <div className="container">
        <img src={LogoTypeHeaderImg} alt="logotype" className={style.logoImg} />
        <nav className={style.nav}>
          <Link to={MAIN_ROUTE} className={style.logoText}>ShutWorld</Link>
          <ul className={style.list}>
            {items.map((item) => (
              <li key={item.id} className={style.listItem}>
                <Link to={item.href}>{item.value}</Link>
              </li>
            ))}
          </ul>
          {store.isAuth ?
            <ButtonAccount />
            :
          <div className={style.login}>
              <Link to={AUTHORIZATION_ROUTE}>Авторизоваться</Link>
          </div>
          }
          <div onClick={handleBurgerClick} className={style.burger}>
            {openBurger ? <img src={BurgerSvg} alt="burger" /> : <img src={ClsBurgerSvg} alt="clouseBurger" /> }
          </div>
        </nav>
      </div>
      {openBurger ? null : <Menu items={items} />}
    </header>
  )
};

export default observer(Navbar);
