import { useContext } from "react";
import { Context } from "../..";

import style from './Profile.module.scss';
import EndPortal from './EndPortal.svg';
import { IP_SERVER } from "../../utils/consts";

const HeroProfile = () => {
  const {store} = useContext(Context);

  return (
    <section className={style.containerHero}>
      <h2 className={style.titleHero}>Приветствуем вас, {store.user.nickname}</h2>
      <p className={style.textHero}>Это страница вашего аккаунта, которая позволяет получать данные о заказах. Если вы не зарегистрированны на нашем игровом проекте ShutWorld ({IP_SERVER}), то купить статус или артефакты вы не сможете.</p>
      <img src={EndPortal} className={style.ImageHero} alt="Ender Portal" />
    </section>
  );
};

export default HeroProfile;