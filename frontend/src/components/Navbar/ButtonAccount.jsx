import { useContext, useEffect, useState } from 'react';
import style from './Navbar.module.scss';
import { Context } from '../..';
import checkMark from '../../images/icon-mark-account.svg'
import { Link, useLocation } from 'react-router-dom';
import { ADMIN_ROUTE, IP_SERVER, PROFILE_ROUTE } from '../../utils/consts';
import { toast } from "react-toastify";

const ButtonAccount = () => {
  const { store } = useContext(Context);
  const [ isOpen, setOpen ] = useState(false);
  const location = useLocation();

  const [ notificationShown, setNotificationShown ] = useState(false);
  const copyText = () => {
    if (!notificationShown) {
      navigator.clipboard.writeText(IP_SERVER)
        .then(() => {
          toast.info("IP скопирован в буфер обмена!", {
            autoClose: 2000,
            onClose: () => setNotificationShown(false)
          });
          setNotificationShown(true);
          console.log("Текст успешно скопирован в буфер обмена");
        })
        .catch((error) => {
          toast.error("Вы заблокировали доступ к буферу обмена!", {
            autoClose: 2000,
            onClose: () => setNotificationShown(false)
          });
          setNotificationShown(true);
          console.error("Не удалось скопировать текст: " + error);
        });
    }
  };

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
          <button onClick={copyText}>IP: {IP_SERVER}</button>
        </div>
      </div>
    </div>
  )
}

export default ButtonAccount