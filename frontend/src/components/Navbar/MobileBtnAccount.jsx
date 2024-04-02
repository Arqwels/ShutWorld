import React, { useContext } from 'react';
import style from './Navbar.module.scss';
import { Context } from '../..';
import { Link } from 'react-router-dom';
import { ADMIN_ROUTE, PROFILE_ROUTE } from '../../utils/consts';

const MobileBtnAccount = () => {
  const { store } = useContext(Context);
  return (
    <div className={style.shell}>
      <div className={style.nicknameMobile}>{store.user.nickname}</div>
      {
        store.user.roles.includes('ADMIN') ? (
          <Link className={style.linksMobile} to={ADMIN_ROUTE}>Мой профиль</Link>
        ) : (
          <Link className={style.linksMobile} to={PROFILE_ROUTE}>Мой профиль</Link>
        )
      }
      <button className={style.linksMobile} onClick={() => store.logout()}>Выйти...</button>
    </div>
  )
}

export default MobileBtnAccount