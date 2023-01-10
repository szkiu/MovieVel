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
      "X-RapidAPI-Key": "2fdffa66bamshb89bffa46284cacp171c2djsn06f35f74cc14",
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
