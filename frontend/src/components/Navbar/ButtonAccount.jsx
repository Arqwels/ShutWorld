import { useContext, useEffect, useState } from 'react';
import style from './Navbar.module.scss';
import { Context } from '../..';
import checkMark from '../../images/icon-mark-account.svg'
import { Link, useLocation } from 'react-router-dom';
import { ADMIN_ROUTE, PROFILE_ROUTE } from '../../utils/consts';

const ButtonAccount = () => {
  const { store } = useContext(Context);
  const [ isOpen, setOpen ] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <div className={style.nickname}>
      <div>
        <button className={`${style.butNickname} ${isOpen ? style.open : ""}`} onClick={() => setOpen(!isOpen)}>
          {store.user.nickname}
          <img src={checkMark} alt="checkMark" />
        </button>
      
        <div className={`${style.dropdown} ${isOpen ? style.active : ""}`}>
          <div className={style.links}>
            {
              store.user.roles.includes('ADMIN') ? (
                <Link to={ADMIN_ROUTE}>Мой профиль</Link>
              ) : (
                <Link to={PROFILE_ROUTE}>Мой профиль</Link>
              )
            }
            <button onClick={() => store.logout()}>Выйти...</button>
          </div>
          <button>IP: 127.0.0.1:5000</button>
        </div>
      </div>
    </div>
  )
}

export default ButtonAccount