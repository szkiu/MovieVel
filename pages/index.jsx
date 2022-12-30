import Head from "next/head";
import s from "../styles/Home.module.scss";
import getMovies from "../services/getMovies";
import getPopularMovies from "../services/getPopularsMovies";
import getShows from "../services/getShows";
import SwiperMovies from "../components/generic/swipermovies/SwiperMovies";
import Header from "../components/generic/header/Header";
import PaginationData from "../components/generic/paginationdata/PaginationData";
import NewMovie from "../components/home/NewMovie";

const Home = ({ popularMovies, movies, shows }) => {
  return (
    <>
      <Head>
        <title>MovieVel</title>
      </Head>

      <Header />

      <main className={s.main}>
        <NewMovie />

        <SwiperMovies movies={popularMovies} title="Popular Movies" />

        <SwiperMovies movies={movies} title="Movies" />

        <PaginationData shows={shows} title="Shows" num={8} />
      </main>
    </>
  );
};

export async function getStaticProps() {
  const popularMovies = await getPopularMovies();
  const movies = await getMovies();
  const shows = await getShows();

  return {
    props: {
      popularMovies,
      movies,
      shows,
    },
    revalidate: 260000,
  };
}

export default Home;
