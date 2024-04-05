import { useContext, useState } from 'react';
import { Context } from '../..';

import HeroProfile from './HeroProfile';
import ToggleSection from './ToggleSection/ToggleSection';

import style from './Profile.module.scss';

import IconPassword from '../../assets/images/icons/password-lock.svg';
import IconMail from '../../assets/images/icons/mail-check.svg';
import IconOrderHistory from '../../assets/images/icons/order-history.svg';

import OrdersHistory from './ToggleSection/OrdersHistory.json'; // Импорт файла JSON
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

  const [ passwordError, setPasswordError ]= useState('');
  const passwordChange = async (oldPassword, newPassword, repeatedNewPassword) => {
    console.log("Старый пароль:", oldPassword);
    console.log("Новый пароль:", newPassword);
    console.log("Повторенный новый пароль:", repeatedNewPassword);

    // Проверка на схожесть newPassword и repeatedNewPassword
    if (newPassword !== repeatedNewPassword) {
      if (notificationShown) {
        return;
      }
      console.error("Новый пароль и повторенный новый пароль не совпадают.");
      toast.error("Новый пароль и повторенный новый пароль не совпадают.", {
        autoClose: 2000,
        onClose: () => setNotificationShown(false)
      });
      setNotificationShown(true);
      return;
    }

    try {
      const result = await UserService.changePassword({oldPassword, newPassword, repeatedNewPassword});
      if (result.data.status) {
        toast.success(result.data.message, {autoClose: 2000})
      }
    } catch (error) {

      console.log(error.response.data.errors);
      if (error.response.data) {
        if (error.response?.data?.errors === 'old-password') {
          toast.error (error.response?.data?.message, {autoClose: 2000})
          return;
        } else if (error.response?.data?.errors === 'new-password') {
          toast.error (error.response?.data?.message, {autoClose: 2000})
          return;
        }
        setPasswordError(error.response?.data?.message)
      }
      console.log(error);
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
        passwordSubmit={passwordChange}
        error={passwordError}
      />
      
      <ToggleSection 
        image={IconOrderHistory} 
        altImage={"Icon order history"}
        bodyText={"Получить историю заказов"}
        ordersHistory={OrdersHistory}
      />
    </div>
  );
};

export default ProfileWrapper;
