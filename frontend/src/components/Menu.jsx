import React from 'react';
import { Link } from 'react-router-dom';

import style from './Menu.module.scss';
import { AUTHORIZATION_ROUTE } from '../utils/consts';

const Menu = ({ header, items }) => {
  return (
    <div className={style.body}>
      {/* Данный блок нужен для закрытия белого фона под фото header */}
      <span className={style.backHead}/>

      <div className={style.menu}>
        <ul className={style.list}>
          {items.map(item =>
            <li key={item.id}>
              <Link to={item.href}>{item.value}</Link>
            </li>
          )}
        </ul>
        <div className={style.login}>
          <Link to={AUTHORIZATION_ROUTE}>Авторизоваться</Link>
        </div>
      </div>
    </div>
  )
}

export default Menu