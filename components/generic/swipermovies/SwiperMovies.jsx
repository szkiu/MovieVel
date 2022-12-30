import { useEffect, useState } from "react";
import s from "../../../styles/swipermovies.module.scss";
import SwiperButtonPrev from "../swiperbuttons/SwiperButtonPrev";
import SwiperButtonNext from "../swiperbuttons/SwiperButtonNext";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import { BsCaretRight } from "react-icons/bs";
import { AiFillStar, AiFillHeart } from "react-icons/ai";
import setFavorites from "../../../utilities/setFavorites";

const SwiperMovies = ({ movies, title, changeStates }) => {
  const [_, changeState] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [mql, setMql] = useState();
  const [mqlMid, setMqlMid] = useState();

  useEffect(() => {
    setIsReady(true);
    setMql(matchMedia("(max-width: 767px)"));
    setMqlMid(matchMedia("(max-width: 1279px)"));
  }, []);

  return (
    <div className={s.swipermovies}>
      <Swiper slidesPerView={mql?.matches ? 1 : mqlMid?.matches ? 2 : 4}>
        <div>
          <p>{title}</p>

          <div>
            <SwiperButtonPrev />
            <SwiperButtonNext />
          </div>
        </div>

        {movies
          ? movies.map((pop, i) => {
              return (
                <SwiperSlide
                  key={pop.id}
                  onMouseEnter={() => {
                    const popHover = document.getElementById(
                      `showHoverData${pop.id}-${pop.title}`
                    );
                    popHover.style.opacity = 1;
                    popHover.style.transform = "translateY(0px)";
                    setTimeout(() => {
                      popHover.style.transform = "translateY(0px)";
                    }, 200);
                  }}
                  onMouseLeave={() => {
                    const popHover = document.getElementById(
                      `showHoverData${pop.id}-${pop.title}`
                    );

                    popHover.style.opacity = 0;
                    setTimeout(() => {
                      popHover.style.transform = "translateY(-999999px)";
                    }, 200);
                  }}
                >
                  <div>
                    <img src={pop.img} alt={pop.title} />
                    <div />
                    <div>
                      <div>
                        <p>{pop.title}</p>
                        <span>{pop.genre.join("/")}</span>
                      </div>

                      <Link href={pop.id}>
                        <BsCaretRight />
                      </Link>
                    </div>
                    <div id={`showHoverData${pop.id}-${pop.title}`}>
                      <div>
                        <h3>{pop.title}</h3>
                        <AiFillHeart
                          style={
                            isReady
                              ? setFavorites(pop, true)
                                ? { color: "red", transition: "color .1s" }
                                : { transition: "color .1s" }
                              : { transition: "color .1s" }
                          }
                          onClick={() => {
                            setFavorites(pop);
                            changeState(!_);
                            changeStates ? changeStates(!_) : null;
                          }}
                        />
                      </div>
                      <div>
                        <p>{pop.year ? pop.year : null}</p>

                        <div>
                          {pop.rating ? (
                            <>
                              <AiFillStar /> {Number.parseFloat(pop.rating) / 2}
                            </>
                          ) : null}
                        </div>
                      </div>
                      <p>
                        {pop.des.length >= 200
                          ? `${pop.des.slice(0, 200)}...`
                          : pop.des}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })
          : null}
      </Swiper>
    </div>
  );
};

export default SwiperMovies;
