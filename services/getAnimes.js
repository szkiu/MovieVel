import axios from "axios";
import settings from "../settings/getMoviesKeys";

const getAnimes = async (genre) => {
  const options = {
    method: "GET",
    url: "https://anime-db.p.rapidapi.com/anime",
    params: {
      page: "1",
      size: "80",
      sortOrder: "asc",
    },
    headers: {
      "X-RapidAPI-Key": "f8bd9615e2msha491048fcacc91bp1e62dfjsnf28c73978dc5",
      "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
    },
  };

  const newData = [];

  try {
    genre !== undefined ? (options.params.genres = genre) : null;

    const res = await axios.request(options);
    res.data.data.forEach((data, i) => {
      if (data.image !== undefined) {
        newData.push({
          id: `anime~${data._id}`,
          des: data.synopsis,
          genre: data.genres,
          img: data.image,
          title: data.title,
          episodes: data.episodes,
          ranking: data.ranking,
        });
      }
    });

    return newData;
  } catch (e) {
    return `${e}, Error has ocurred`;
  }
};

export default getAnimes;
