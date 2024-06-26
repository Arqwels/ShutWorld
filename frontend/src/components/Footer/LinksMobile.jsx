import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './Footer.module.scss';
import LinksMobileIcon from '../../images/LinksMobileIcon.svg';
import { LinksPages, LinksSocial } from './LinksItems';

const LinksMobile = () => {
  const [openLinks, setOpenLinks] = useState({ links: true, feedback: true });
  const location = useLocation();

  // Закрыть меню при изменении маршрута
  useEffect(() => {
    setOpenLinks({ links: true, feedback: true });
  }, [location]);

  const toggleOpenLinks = (key) => {
    setOpenLinks((prevState) => ({ ...prevState, [key]: !prevState[key] }));
  };

  return (
    <div className={style.LinksMobile}>
      <div className={style.LinksMobText} onClick={() => toggleOpenLinks('links')}>
        <p>Ссылки</p>
        <img src={LinksMobileIcon} alt="LinksMobileIcon" className={openLinks.links ? '' : style.activeImg} />
      </div>
      <span className={openLinks.links ? style.hide : ''}>
        <ul className={style.items}>
          {LinksPages.map((link) => (
            <li key={link.id}>
              <Link to={link.to}>{link.labelText}</Link>
            </li>
          ))}
        </ul>
      </span>
      <div className={style.LinksMobText} onClick={() => toggleOpenLinks('feedback')}>
        <p>Обратная связь</p>
        <img src={LinksMobileIcon} alt="LinksMobileIcon" className={openLinks.feedback ? '' : style.activeImg} />
      </div>
      <span className={openLinks.feedback ? style.hide : ''}>
        <ul className={style.items}>
          {LinksSocial.map((link) => (
            <li key={link.id}>
              <Link to={link.to} target="_blank" rel="noopener noreferrer">{link.labelText}</Link>
            </li>
          ))}
        </ul>
      </span>
    </div>
  );
};

export default LinksMobile;