import { useState, useEffect } from "react";
import s from "../../styles/Home.module.scss";
import Head from "next/head";
import Header from "../../components/generic/header/Header";
import SwiperMovies from "../../components/generic/swipermovies/SwiperMovies";

const Favorites = () => {
  const [favorites, setFavorites] = useState();
  const [user, setUser] = useState();
  const [_, changeState] = useState(false);
  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")));
    setUser(JSON.parse(localStorage.getItem("account")));
  }, [_]);

  return (
    <>
      <Head>
        <title>MovieVel | Favorite</title>
      </Head>

      <Header />

      <main
        className={favorites?.length === 0 || !user ? s.main : null}
        style={
          favorites?.length === 0 || !user ? { justifyContent: "center" } : null
        }
      >
        {user ? (
          favorites.length === 0 ? (
            <h3>Favorites is empty...</h3>
          ) : (
            <SwiperMovies
              title={"Favorites"}
              movies={favorites ? favorites : null}
              changeStates={changeState}
            />
          )
        ) : (
          <h3>You need to register, to use Favorites system...</h3>
        )}
      </main>
    </>
  );
};

export default Favorites;
