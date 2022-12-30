import { useSwiper } from "swiper/react";
import { AiOutlineLeft } from "react-icons/ai";

const SwiperButtonPrev = () => {
  const swiper = useSwiper();
  return (
    <button onClick={() => swiper.slidePrev()}>
      <AiOutlineLeft />
    </button>
  );
};

export default SwiperButtonPrev;
