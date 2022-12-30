import s from "../styles/individual.module.scss";
import Head from "next/head";
import Header from "../components/generic/header/Header";
import getIndividual from "../services/getIndividual";
import capitaliceAllLetters from "../utilities/capitaliceAllLetters";
import { AiFillStar } from "react-icons/ai";

const IndividualMovie = ({ res, id }) => {
  id.split("~")[0] === "top100" ? (res.type = "movie") : null;
  return (
    <>
      <Head>
        <title>{`MovieVel | ${res.title}`}</title>
      </Head>

      <Header />

      <main className={s.main}>
        <div>
          <img src={res.img} alt="" />
        </div>
        <div>
          <h1>{res.title}</h1>
          <div>
            {res.genre.map((genre) => {
              return <span key={genre}>{genre}</span>;
            })}
          </div>
          <p>{res.des}</p>
          <div>
            <div>
              <AiFillStar />
              <span>{(Number.parseFloat(res.rating) / 2).toFixed(1)}</span>
            </div>
            <span>{capitaliceAllLetters(res.type)}</span>
          </div>
          <div>
            <span>Released date: </span>
            <span>{res.year}</span>
          </div>
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps(context) {
  let res;
  if (context.query.id.split("~")[0] === "anime") {
    res = await getIndividual(context.query.id.split("~")[1], {
      ott: false,
      host: "anime-db.p.rapidapi.com",
      key: "f8bd9615e2msha491048fcacc91bp1e62dfjsnf28c73978dc5",
      url: "https://anime-db.p.rapidapi.com/anime/by-id/",
    });
  } else if (context.query.id.split("~")[0] === "ott") {
    res = await getIndividual(context.query.id.split("~")[1], {
      ott: true,
      host: "ott-details.p.rapidapi.com",
      key: "70777f5babmsh95a3d4d2a9c8bacp13e1e0jsn2fbd6b6824ef",
      url: "https://ott-details.p.rapidapi.com/gettitleDetails",
    });
  } else {
    res = await getIndividual(context.query.id.split("~")[1], {
      ott: false,
      host: "imdb-top-100-movies.p.rapidapi.com",
      key: "f8bd9615e2msha491048fcacc91bp1e62dfjsnf28c73978dc5",
      url: "https://imdb-top-100-movies.p.rapidapi.com/",
    });
  }

  return {
    props: {
      res,
      id: context.query.id,
    },
  };
}

export default IndividualMovie;
