import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper";

import cubeSwap from "../../../assets/images/ShopPage/cube-swap.png";
import bagSwap from "../../../assets/images/ShopPage/bag-swap.png";
import thanksSwap from "../../../assets/images/ShopPage/thanks-swap.png";
import linksSwap from "../../../assets/images/ShopPage/links-swap.png";
import BelowButton from "../../../assets/images/icons/button-below-icon.svg";

import st from "./SliderShop.module.scss";

const SliderShop = () => {
  return (
    <section>
      <div className={st.sliderTitle}>
        <h2>Магазин</h2>
        <p>Мы сделали максимально удобный и быстрый<br/>магазин для Ваших покупок</p>
      </div>

      <div className={st.swiper}>
        <Swiper 
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 7500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, EffectFade]}
            effect="Centered auto"
            >
            <SwiperSlide>
              <div className={st.swiperSlide}>
                <img className={st.cubeSwap} src={cubeSwap} alt="cubeSwap" />
                <div className={st.textSlide}>
                  <h2>Спасибо Вам!</h2>
                  <p>Покупая что-то у нас, Вы очень сильно помогаете нам в развитии проекта. Мы очень благодарны нашим покупателям и пытаемся щедро наградить им.</p>
                </div>
                <img className={st.swapImg} src={thanksSwap} alt="likeSwap" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={st.swiperSlide}>
                <img className={st.cubeSwap} src={cubeSwap} alt="cubeSwap" />
                <div className={st.textSlide}>
                  <h2>Как покупать выгодно?</h2>
                  <p>У нас имеется купоны, которые дают скидки на наши товары. Мы эти купоны выкладываем на нашем группе ВКонтакте, Discord-канале и бывает даже на самом сервере.</p>
                </div>
                <img className={st.swapImg} src={linksSwap} alt="linksSwap" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={st.swiperSlide}>
                <img className={st.cubeSwap} src={cubeSwap} alt="cubeSwap" />
                <div className={st.textSlide}>
                  <h2>Нашёл баг?</h2>
                  <p>Если Вы нашли баг на нашем сервере, то сообщите поскорее нам в ВКонтакте или в Discord! Мы выдадим Вам приз в виде плюшек или купонов в зависимости от крититичности бага.</p>
                </div>
                <img className={st.swapImg} src={bagSwap} alt="bagSwap" />
              </div>
            </SwiperSlide>

        </Swiper>
      </div>

      <div id="scroll" className={st.sliderBottom}>
        <p>Ниже список товаров</p>
        <img src={BelowButton} alt="BelowButton" />
      </div>
    </section>
  )
};

export default SliderShop;