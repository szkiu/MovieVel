import s from "../../styles/movies.module.scss";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/generic/header/Header";
import PaginationData from "../../components/generic/paginationdata/PaginationData";
import getSearchedMovies_Animes from "../../services/getSearchedMovies_Animes";
import capitalizeLetters from "../../utilities/capitaliceAllLetters";

const Search = ({ Mo_Ani }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>MovieVel | Search</title>
      </Head>

      <Header />

      <main>
        <PaginationData
          shows={Mo_Ani}
          title={`Name Searched: ${capitalizeLetters(
            router.asPath.split("search=")[1].replaceAll("~", " ")
          ).join("")}`}
          num={12}
          isMiniCard={true}
        />
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const Mo_Ani = await getSearchedMovies_Animes(
    context.query.search.replaceAll("~", " ")
  );

  return {
    props: {
      Mo_Ani,
    },
  };
};

export default Search;
