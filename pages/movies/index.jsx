import s from "../../styles/movies.module.scss";
import Head from "next/head";
import Header from "../../components/generic/header/Header";
import Categories from "../../components/generic/categories/Categories";
import PaginationData from "../../components/generic/paginationdata/PaginationData";
import getMovies from "../../services/getMovies";
import { useRouter } from "next/router";

const Movies = ({ movies }) => {
  const genres = [
    "Action",
    "Adult",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Game-Show",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "News",
    "Reality-TV",
    "Romance",
    "Sci-Fi",
    "Short",
    "Sport",
    "Talk-Show",
    "Thriller",
    "War",
    "Western",
  ];
  const router = useRouter();

  return (
    <>
      <Head>
        <title>MovieVel | Movies</title>
      </Head>

      <Header />

      <main>
        <PaginationData
          shows={movies}
          title={`Movies Genres: ${
            router.asPath === "/movies"
              ? "All"
              : router.asPath.split("search=")[1].replaceAll("~", ", ")
          }`}
          num={12}
        >
          <Categories genres={genres} />
        </PaginationData>
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  let movies;
  context?.query?.search?.includes("~")
    ? (movies = await getMovies(context.query.search.replaceAll("~", ",")))
    : (movies = await getMovies(context.query.search));

  return {
    props: {
      movies,
    },
  };
};

export default Movies;
