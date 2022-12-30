import React, { useEffect, useState } from "react";
import s from "../../../styles/paginationdata.module.scss";
import forcePagination from "../../../utilities/forzarPaginacion";
import setFavorites from "../../../utilities/setFavorites";
import {
  AiFillStar,
  AiOutlineLeft,
  AiOutlineRight,
  AiFillHeart,
} from "react-icons/ai";
import { BsCaretRight } from "react-icons/bs";
import Link from "next/link";

const PaginationData = ({ shows, title, num, isMiniCard, children }) => {
  const [pagination, setPagination] = useState(1);
  const [_, changeState] = useState(false);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className={!isMiniCard ? s.paginationdata_1 : s.paginationdata_2}>
      <div>
        <p>{title}</p>

        {children}
      </div>

      {!isMiniCard ? (
        <>
          <div>
            {forcePagination(shows, num, pagination).result.map((pop, i) => {
              return (
                <div
                  key={pop.id}
                  onMouseEnter={() => {
                    const popHover = document.getElementById(
                      `popMovHoverData${pop.id}`
                    );

                    popHover.style.opacity = 1;
                    popHover.style.transform = "translateY(0px)";
                    setTimeout(() => {
                      popHover.style.transform = "translateY(0px)";
                    }, 200);
                  }}
                  onMouseLeave={() => {
                    const popHover = document.getElementById(
                      `popMovHoverData${pop.id}`
                    );

                    popHover.style.opacity = 0;
                    setTimeout(() => {
                      popHover.style.transform = "translateY(-999999px)";
                    }, 200);
                  }}
                >
                  <>
                    <img src={pop.img} alt={pop.title} />
                    <div></div>
                    <div>
                      <div>
                        <p>{pop.title}</p>
                        <span>
                          {pop.genre.length > 4
                            ? pop.genre.slice(0, 4).join("/")
                            : pop.genre.join("/")}
                        </span>
                      </div>

                      <Link href={pop.id}>
                        <BsCaretRight />
                      </Link>
                    </div>
                    <div id={`popMovHoverData${pop.id}`}>
                      <div>
                        <h3>{pop.title}</h3>

                        <AiFillHeart
                          style={
                            isReady
                              ? setFavorites(pop, true)
                                ? { color: "red" }
                                : null
                              : null
                          }
                          onClick={() => {
                            setFavorites(pop);
                            changeState(!_);
                          }}
                        />
                      </div>
                      <div>
                        <p>
                          {pop.year
                            ? pop.year
                            : pop.episodes
                            ? pop.episodes === 1
                              ? "Movie"
                              : `Episodes: ${pop.episodes}`
                            : "Unknown"}
                        </p>

                        <div>
                          {pop.rating ? (
                            <>
                              <AiFillStar /> {Number.parseFloat(pop.rating) / 2}
                            </>
                          ) : pop.ranking ? (
                            `Ranking: ${pop.ranking}`
                          ) : null}
                        </div>
                      </div>
                      <p>
                        {pop?.des?.length >= 180
                          ? `${pop.des.slice(0, 180)}...`
                          : pop.des}
                      </p>
                    </div>
                  </>
                </div>
              );
            })}
          </div>

          <div>
            {shows !== undefined ? (
              forcePagination(shows, num, pagination).last !== 0 ? (
                <>
                  {pagination !== 1 ? (
                    <div onClick={() => setPagination(pagination - 1)}>
                      <AiOutlineLeft />
                    </div>
                  ) : null}

                  {shows !== undefined ? (
                    pagination !== 1 && pagination - 1 !== 1 ? (
                      <>
                        <div onClick={() => setPagination(1)}>
                          <span>{1}</span>
                        </div>
                      </>
                    ) : null
                  ) : null}

                  {shows !== undefined
                    ? forcePagination(shows, num, pagination).numbs.map(
                        (el, i) => {
                          if (
                            el === pagination - 1 ||
                            el === pagination ||
                            el === pagination + 1
                          ) {
                            return (
                              <div
                                key={el}
                                onClick={() => setPagination(el)}
                                className={
                                  el === pagination ? s.cat_active : null
                                }
                              >
                                <span>{el}</span>
                              </div>
                            );
                          }
                        }
                      )
                    : null}

                  {shows !== undefined ? (
                    pagination !==
                      forcePagination(shows, num, pagination).last &&
                    pagination + 1 !==
                      forcePagination(shows, num, pagination).last ? (
                      <>
                        <div
                          onClick={() =>
                            setPagination(
                              forcePagination(shows, num, pagination).last
                            )
                          }
                        >
                          <span>
                            {forcePagination(shows, num, pagination).last}
                          </span>
                        </div>
                      </>
                    ) : null
                  ) : null}

                  {shows !== undefined ? (
                    pagination !==
                    forcePagination(shows, num, pagination).last ? (
                      <div onClick={() => setPagination(pagination + 1)}>
                        <AiOutlineRight />
                      </div>
                    ) : null
                  ) : null}
                </>
              ) : null
            ) : null}
          </div>
        </>
      ) : (
        <>
          <div>
            {forcePagination(shows, num, pagination).result.map((pop, i) => {
              return (
                <div key={pop.id}>
                  <div>
                    <h3>{pop.title}</h3>
                    <span>
                      {pop.genre.length > 5
                        ? pop.genre.slice(0, 5).join("/")
                        : pop.genre.join("/")}
                    </span>
                    <div>
                      <p>
                        {pop.year
                          ? pop.year
                          : pop.ranking
                          ? `Ranking: ${pop.ranking}`
                          : "Unknown"}
                      </p>

                      <div>{pop.type}</div>
                    </div>
                  </div>

                  <Link href={pop.id}>
                    <BsCaretRight />
                  </Link>
                </div>
              );
            })}
          </div>

          <div>
            {shows !== undefined ? (
              forcePagination(shows, num, pagination).last !== 0 ? (
                <>
                  {pagination !== 1 ? (
                    <div onClick={() => setPagination(pagination - 1)}>
                      <AiOutlineLeft />
                    </div>
                  ) : null}

                  {shows !== undefined ? (
                    pagination !== 1 && pagination - 1 !== 1 ? (
                      <>
                        <div onClick={() => setPagination(1)}>
                          <span>{1}</span>
                        </div>
                      </>
                    ) : null
                  ) : null}

                  {shows !== undefined
                    ? forcePagination(shows, num, pagination).numbs.map(
                        (el, i) => {
                          if (
                            el === pagination - 1 ||
                            el === pagination ||
                            el === pagination + 1
                          ) {
                            return (
                              <div
                                key={el}
                                onClick={() => setPagination(el)}
                                className={
                                  el === pagination ? s.cat_active : null
                                }
                              >
                                <span>{el}</span>
                              </div>
                            );
                          }
                        }
                      )
                    : null}

                  {shows !== undefined ? (
                    pagination !==
                      forcePagination(shows, num, pagination).last &&
                    pagination + 1 !==
                      forcePagination(shows, num, pagination).last ? (
                      <>
                        <div
                          onClick={() =>
                            setPagination(
                              forcePagination(shows, num, pagination).last
                            )
                          }
                        >
                          <span>
                            {forcePagination(shows, num, pagination).last}
                          </span>
                        </div>
                      </>
                    ) : null
                  ) : null}

                  {shows !== undefined ? (
                    pagination !==
                    forcePagination(shows, num, pagination).last ? (
                      <div onClick={() => setPagination(pagination + 1)}>
                        <AiOutlineRight />
                      </div>
                    ) : null
                  ) : null}
                </>
              ) : null
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default PaginationData;
