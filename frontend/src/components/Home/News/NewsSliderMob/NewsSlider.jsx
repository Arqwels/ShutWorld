import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import 'swiper/css/pagination';
import NewsForSlider from "./NewsForSlider";
import st from "./NewsSlider.module.scss";
import "./NewsSliderStyles.css";
import Icon from "../../../../images/icon-swipper.svg";

const NewsSlider = ({ posts }) => {
  const [slideBegOrNot, handleSlideByState] = useState({
    isFirst: true,
    isLast: false
  });

  const SlideRef = useRef();

  const slideChange = swiper => {
    handleSlideByState({
      isFirst: swiper.isBeginning,
      isLast: swiper.isEnd
    });
  };

  const { isFirst, isLast } = slideBegOrNot;

  return (
    <Swiper 
      slidesPerView={1}
      spaceBetween={0}
      navigation={false}
      pagination={{
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }}
      className={'mySwiper'}
      ref={SlideRef}
      onSlideChange={slideChange}
      modules={[Pagination, Navigation]}
    >

      {posts.map((post, index) => (
        <SwiperSlide key={index}>
          <NewsForSlider {...post} />
        </SwiperSlide>
      ))}

        
      <div className={st.paginat}>
        <button className={`${st.icon} ${st.prev} ${isFirst ? st.disabled : ''}`} onClick={()=> SlideRef.current.swiper.slidePrev()}>
          <img src={Icon} alt="PrevIcon"/>
        </button>
        <div className="swiper-pagination swiper-pagination-custom"></div>
        <button className={`${st.icon} ${isLast ? st.disabled : ''}`} onClick={()=> SlideRef.current.swiper.slideNext()}>
          <img src={Icon} alt="NextIcon" />
        </button>
      </div>
    </Swiper>
  )
}

export default NewsSlider