import { useSwiper } from "swiper/react";
import { AiOutlineRight } from "react-icons/ai";

const SwiperButtonNext = () => {
  const swiper = useSwiper();
  return <button onClick={() => swiper.slideNext()}><AiOutlineRight/></button>;
};

export default SwiperButtonNext;
