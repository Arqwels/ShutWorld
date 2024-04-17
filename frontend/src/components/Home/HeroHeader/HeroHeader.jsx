import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Hero.module.scss";
import EndShip from "../../../assets/images/Images/EndShip.png";
import { IP_SERVER, PLAY_ROUTE } from "../../../utils/consts";
import { toast } from "react-toastify";

const HeroHeader = () => {
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

  return (
    <div className={style.header}>
      <div className={style.blockLeft}>
        <div className={style.blockIp} onClick={copyText}>
          <p>IP: {IP_SERVER}</p>
        </div>
        <h1 className={style.blockTitle}>SHUTWORLD</h1>
        <p className={style.blockText}>Выживание с элементами РПГ. На нашем сервере уникальная система мобов и предметов отличающаяся от большинства серверов и не только.</p>
        <div className={style.blockInfo}>
          <div className={style.blockLinkPlay}>
            <Link to={PLAY_ROUTE}>Начать играть</Link>
          </div>
          <div className={style.blockInfoOnline}>
            <p>10</p>
          </div>
        </div>
      </div>
      <img src={EndShip} alt="EndShip" className={style.blockRight} />
    </div>
  )
};

export default HeroHeader;