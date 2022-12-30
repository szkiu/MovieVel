import s from "../../styles/movies.module.scss";
import Head from "next/head";
import Header from "../../components/generic/header/Header";
import Categories from "../../components/generic/categories/Categories";
import PaginationData from "../../components/generic/paginationdata/PaginationData";
import { useRouter } from "next/router";
import getAnimes from "../../services/getAnimes";

const Anime = ({ animes }) => {
  const genres = [
    "Award Winning",
    "Action",
    "Suspense",
    "Horror",
    "Ecchi",
    "Avant Garde",
    "Sports",
    "Supernatural",
    "Fantasy",
    "Gourmet",
    "Boys Love",
    "Drama",
    "Comedy",
    "Mystery",
    "Girls Love",
    "Slice of Life",
    "Adventure",
    "Romance",
    "Sci-Fi",
    "Erotica",
    "Hentai",
  ];

  const router = useRouter();

  return (
    <>
      <Head>
        <title>MovieVel | Anime</title>
      </Head>

      <Header />

      <main className={s.main}>
        <PaginationData
          shows={animes}
          title={`Movies Genres: ${
            router.asPath === "/anime"
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

export async function getServerSideProps(context) {
  let animes;
  context?.query?.search?.includes("~")
    ? (animes = await getAnimes(context.query.search.replaceAll("~", ",")))
    : (animes = await getAnimes(context.query.search));

  return {
    props: {
      animes,
    },
  };
}

export default Anime;
