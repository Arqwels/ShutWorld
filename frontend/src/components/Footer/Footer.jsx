import { Link } from 'react-router-dom';
import cubeFooter from '../../images/cube-footer.png';
import style from './Footer.module.scss';
import LinksMobile from './LinksMobile';
import { LinksPages, LinksSocial } from './LinksItems';
import { MAIN_ROUTE, PROJECT_CREATION_DATE } from '../../utils/consts';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Получаем текущий год

  return (
    <footer className={style.footerContainer}>
      <div className="container">
        <section className={style.footer}>
          <div className={style.logo} onClick={() => window.location.href = {MAIN_ROUTE}}>
            <img src={cubeFooter} alt="cube-footer" />
            <h2>SHUT<br />WORLD</h2>
          </div>
          <div className={style.links}>
            <ul className={style.socialLinks}>
              <li>Обратная связь:</li>
              {LinksSocial.map((link) => (
                <li key={link.id}>
                  <Link to={link.to} target="_blank">{link.labelText}</Link>
                </li>
              ))}
            </ul>
            <ul className={style.pagesLinks}>
              <li>Ссылки:</li>
              {LinksPages.map((link) => (
                <li key={link.id}>
                  <Link to={link.to}>{link.labelText}</Link>
                </li>
              ))}
            </ul>
          </div>
          <LinksMobile />
        </section>
        <div className={style.yearCreation}>
          <h3>© {PROJECT_CREATION_DATE} - {currentYear} SHUTWORLD</h3>
          <p>Проект ShutWorld не относится к Mojang Studios.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
