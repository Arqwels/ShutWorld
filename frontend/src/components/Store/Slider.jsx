import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from "swiper";

import cubeSwap from '../../images/cube-swap.png';
import bagSwap from '../../images/bag-swap.png';
import thanksSwap from '../../images/thanks-swap.png';
import linksSwap from '../../images/links-swap.png';

import 'swiper/css';

const Slider = () => {
  return (
  <section className="slider">
    <div className="slider__title">
      <h2>Магазин</h2>
      <p>Мы сделали максимально удобный и быстрый<br/>магазин для Ваших покупок</p>
    </div>

    <Swiper spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 7500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade]}
        effect="Centered auto">
    <div className="swiper">

      <div className="swiper-wrapper">
        <SwiperSlide>
        <div className="swiper-slide">
          <img className="cube-swap" src={cubeSwap} alt="" />
          <div className="text-swiper">
            <h2>Спасибо Вам!</h2>
            <p>Покупая что-то у нас, Вы очень сильно помогаете нам в развитии проекта. Мы очень благодарны нашим покупателям и пытаемся щедро наградить им.</p>
          </div>
          <img className="like-swap" src={thanksSwap} alt="" />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="swiper-slide">
          <img className="cube-swap" src={cubeSwap} alt="" />
          <div className="text-swiper">
            <h2>Нашёл баг?</h2>
            <p>Если Вы нашли баг на нашем сервере, то сообщите поскорее нам в ВКонтакте или в Discord! Мы выдадим Вам приз в виде плюшек или купонов в зависимости от крититичности бага.</p>
          </div>
          <img className="bag-swap" src={bagSwap} alt="" />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="swiper-slide">
          <img className="cube-swap" src={cubeSwap} alt="" />
          <div className="text-swiper">
            <h2>Как покупать выгодно?</h2>
            <p>У нас имеется купоны, которые дают скидки на наши товары. Мы эти купоны выкладываем на нашем группе ВКонтакте, Discord-канале и бывает даже на самом сервере.</p>
          </div>
          <img className="links-swap" src={linksSwap} alt="" />
        </div>
        </SwiperSlide>
      </div>

    </div>
    </Swiper>
    <div id="scroll" className="slider__bottom">
      <div className="slider__bottom__block">
        <p>Ниже список товаров</p>
        <img src="images/icon-downpage.png" alt="" />
      </div>
      
    </div>
  </section>
  )
}

export default Slider