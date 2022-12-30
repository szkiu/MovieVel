import axios from "axios";
import settings from "../settings/getMoviesKeys";

const getMovies = async (genre) => {
  const options = {
    method: "GET",
    url: settings.URL,
    params: {
      start_year: "1970",
      end_year: "2020",
      min_imdb: "8",
      language: "english",
      type: "movie",
      page: "1",
    },
    headers: {
      "X-RapidAPI-Key": "70777f5babmsh95a3d4d2a9c8bacp13e1e0jsn2fbd6b6824ef",
      "X-RapidAPI-Host": settings.RAPIDAPI_HOST,
    },
  };

  const newData = [];

  try {
    genre !== undefined ? (options.params.genre = genre.toLowerCase()) : null;
    const res = await axios.request(options);
    res.data.results.forEach((data, i) => {
      if (data.imageurl.length !== 0) {
        newData.push({
          id: `ott~${data.imdbid}`,
          des: data.synopsis,
          genre: data.genre,
          img: data.imageurl[0],
          title: data.title,
          year: data.released,
          rating: data.imdbrating,
        });
      }
    });

    return newData;
  } catch (e) {
    return `${e}, Error has ocurred`;
  }
};

export default getMovies;
