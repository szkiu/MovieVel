import axios from "axios";
import settings from "../settings/getMoviesKeys";

const getIndividual = async (id, { url, key, host, ott }) => {
  let options_1;
  let options_2;
  if (!ott) {
    options_1 = {
      method: "GET",
      url: `${url}${id}`,
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": host,
      },
    };
  } else {
    options_2 = {
      method: "GET",
      url: `${url}`,
      params: { imdbid: id },
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": host,
      },
    };
  }
  let newData;

  try {
    let res;
    ott
      ? (res = await axios.request(options_2))
      : (res = await axios.request(options_1));
    const data = res.data;
    if (ott) {
      newData = {
        id: data.imdbid,
        title: data.title,
        des: data.synopsis,
        genre: data.genre,
        img: data.imageurl[0] || "Unknown",
        year: data.released,
        rating: data.imdbrating,
        type: data.type || "Unknown",
      };
    } else {
      newData = {
        id: data.imdbid || data._id,
        title: data.title,
        des: data.synopsis || data.description,
        genre: data.genre || data.genres,
        img: data.image,
        year: data.released || data.year || "Unknown",
        rating: data.imdbrating || data.rating || "Unknown",
        ranking: data.ranking || data.rank || "Unknown",
        episodes: data.episodes || "Unknown",
        type: data.type || "Unknown",
      };
    }

    return newData;
  } catch (e) {
    return `${e}, Error has ocurred`;
  }
};

export default getIndividual;
