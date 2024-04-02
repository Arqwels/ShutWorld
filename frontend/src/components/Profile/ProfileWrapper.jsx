import { useContext } from 'react';
import { Context } from '../..';

import HeroProfile from './HeroProfile';
import ToggleSection from './ToggleSection/ToggleSection';

import style from './Profile.module.scss';

import IconPassword from '../../assets/images/icons/password-lock.svg';
import IconMail from '../../assets/images/icons/mail-check.svg';
import IconOrderHistory from '../../assets/images/icons/order-history.svg';

import OrdersHistory from './ToggleSection/OrdersHistory.json'; // Импорт файла JSON

const ProfileWrapper = () => {
  const {store} = useContext(Context);

  const activatMail = () => {
    console.log(123);
  }

  const passwordChange = async (e) => {
    e.preventDefault();
    console.log(345);
  }

  // Получаем историю, записываем в переменную и уже её будем передавать

  // const getOrdersHistory = () => {
  //   console.log(345345);
  // }
  

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
          emailSubmit={activatMail}
        />
      )}
      <ToggleSection 
        image={IconPassword} 
        altImage={"Icon password"}
        bodyText={"Изменить пароль"}
        passwordSubmit={passwordChange}
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