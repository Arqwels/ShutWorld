import { useContext, useState } from 'react';
import { Context } from '../..';

import HeroProfile from './HeroProfile';
import ToggleSection from './ToggleSection/ToggleSection';

import style from './Profile.module.scss';

import IconPassword from '../../assets/images/icons/password-lock.svg';
import IconMail from '../../assets/images/icons/mail-check.svg';
import IconOrderHistory from '../../assets/images/icons/order-history.svg';

import UserService from '../../service/UserService';
import { toast } from "react-toastify";

const ProfileWrapper = () => {
  const { store } = useContext(Context);
  const [ notificationShown, setNotificationShown ] = useState(false);
  const [ stateMailBtn, setStateMailBtn ] = useState(false);

  const activateMail = async () => {
    try {
      if (notificationShown) {
        return;
      }

      setStateMailBtn(true);

      const result = await UserService.getMailMessage();
      toast.success(result.data.message, {
        autoClose: 2000,
        onClose: () => setNotificationShown(false)
      });
    } catch (error) {
      // Если произошла ошибка, устанавливаем время последней ошибки
      setStateMailBtn(true)
      toast.error(error.response.data.message, {
        autoClose: 2000,
        onClose: () => setNotificationShown(false)
      });
      setNotificationShown(true);
      console.error(error);

      // Устанавливаем таймер для сброса уведомления через 1 минуту
      setTimeout(() => {
        setNotificationShown(false);
        setStateMailBtn(false);
      }, 60000);
    }
  }
  
  return (
    <div className={style.wrapper}>
      <HeroProfile />
      <br />
      {store.user.isActivated === false && (
        <ToggleSection 
          image={IconMail} 
          altImage={"Icon mail"}
          bodyText={"Подтвердить почту"}
          emailText={<>Если вы потеряли сообщение,<br />нажмите кнопку ниже "Отправить"</>}
          emailSubmit={activateMail}
          btnState={stateMailBtn}
        />
      )}
      <ToggleSection 
        image={IconPassword} 
        altImage={"Icon password"}
        bodyText={"Изменить пароль"}
        passwordToggle
      />
      
      <ToggleSection 
        image={IconOrderHistory} 
        altImage={"Icon order history"}
        bodyText={"Получить историю заказов"}
        ordersHistoryToggle
      />
    </div>
  );
};

export default ProfileWrapper;
