import axios from "axios";
import settings from "../settings/getMoviesKeys";

const getShows = async () => {
  const options = {
    method: "GET",
    url: settings.URL,
    params: {
      start_year: "1970",
      end_year: "2020",
      min_imdb: "8",
      language: "english",
      type: "show",
      page: "1",
    },
    headers: {
      "X-RapidAPI-Key": "21380bf9d4msh8bdefd0d2aa233ap1c8139jsn510bd3569629",
      "X-RapidAPI-Host": settings.RAPIDAPI_HOST,
    },
  };
  const newData = [];

  try {
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

export default getShows;
