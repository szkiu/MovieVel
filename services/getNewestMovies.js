import axios from "axios";
import settings from "../settings/getNewestMoviesKeys";

const getNewestMovies = async () => {
  const options = {
    method: "GET",
    url: settings.URL,
    params: { region: "US", page: "1" },
    headers: {
      "X-RapidAPI-Key": settings.RAPIDAPI_KEY,
      "X-RapidAPI-Host": settings.RAPIDAPI_HOST,
    },
  };
  const newData = [];

  try {
    const res = await axios.request(options);
    res.data.results.forEach((data, i) => {
      if (data.imageurl.length !== 0) {
        newData.push({
          id: data.imdbid,
          des: data.synopsis,
          genre: data.genre,
          img: data.imageurl[0],
          title: data.title,
          year: data.released,
          rating: data.imdbrating,
        });
      }
    });

    return res;
  } catch (e) {
    return `${e}, Error has ocurred`;
  }
};

export default getNewestMovies;
