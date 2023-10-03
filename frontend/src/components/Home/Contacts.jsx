import React from 'react';
import { Link } from "react-router-dom";

import style from './Contacts.module.css';
import discordImg from '../../images/discord.svg';
import vkImg from '../../images/vk.svg';
import link from '../../images/icon-link.svg';
import { DS_LINK, VK_LINK } from '../../utils/consts';

const Contacts = () => {
  return (
    <section className={"container " + style.contacts}>
      <h2 className={style.head}>Наши контакты</h2>
      <div className={style.block}>
        <Link to={VK_LINK} target="_blank" className={style.block_link}>
          <article className={style.block_linkItem}>
            <img src={discordImg} alt="vk" className={style.soc_img} />
            <div className={style.soc_link}>
              <img src={link} alt="" />
              <p>vk.com/shutworld</p>
            </div>
          </article>
        </Link>
        <Link to={DS_LINK} target="_blank" className={style.block_link}>
          <article className={style.block_linkItem}>
            <img src={vkImg} alt="ds" className={style.soc_img} />
            <div className={style.soc_link}>
              <img src={link} alt="" />
              <p>discord.gg/shutworld</p>
            </div>
          </article>
        </Link>
      </div>
    </section>
  )
}

export default Contacts