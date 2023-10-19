import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './Footer.module.scss';
import LinksMobileIcon from '../../images/LinksMobileIcon.svg';
import { LinksPages, LinksSocial } from './LinksItems';

const LinksMobile = () => {
  const [openLink1, setOpenLink1] = useState(true);
  const [openLink2, setOpenLink2] = useState(true);
  const location = useLocation();

  // Закрыть меню при изменении маршрута
  useEffect(() => {
    setOpenLink1(true);
    setOpenLink2(true);
  }, [location]);

  return (
    <div className={style.LinksMobile}>
      <div className={style.LinksMobText} onClick={() => setOpenLink1(!openLink1)}>
        <p>Ссылки</p>
        <img src={LinksMobileIcon} alt="LinksMobileIcon" className={openLink1 ? '' : style.activeImg}/>
      </div>
      <span className={`${openLink1 ? style.hide : ''}`}>
        <ul className={style.items}>
          {LinksPages.map((link) => (
            <li key={link.id}>
              <Link to={link.to}>{link.labelText}</Link>
            </li>
          ))};
        </ul>
      </span>
      <div className={style.LinksMobText} onClick={() => setOpenLink2(!openLink2)}>
        <p>Обратная связь</p>
        <img src={LinksMobileIcon} alt="LinksMobileIcon" />
      </div>
      <span className={`${openLink2 ? style.hide : ''}`}>
        <ul className={style.items}>
        {LinksSocial.map((link) => (
          <li key={link.id}>
            <Link to={link.to} target="_blank">{link.labelText}</Link>
          </li>
        ))};
        </ul>
      </span>
    </div>
  )
};

export default LinksMobile;