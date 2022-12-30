import axios from "axios";
import settings from "../settings/getPopularsMoviesKeys";

const getPopularMovies = async () => {
  const options = {
    method: "GET",
    url: settings.URL,
    headers: {
      "X-RapidAPI-Key": "4b5dae2f18msh20b900154ed84afp1ced00jsn434cfb9566ec",
      "X-RapidAPI-Host": settings.RAPIDAPI_HOST,
    },
  };
  const newData = [];

  try {
    const res = await axios.request(options);
    res.data.forEach((data, i) => {
      newData.push({
        id: `top100~${data.id}`,
        des: data.description,
        director: data.director,
        genre: data.genre,
        img: data.image,
        rating: data.rating,
        thumbnail: data.thumbnail,
        title: data.title,
        trailer: data.trailer,
        writers: data.writers,
        year: data.year,
      });
    });

    return newData;
  } catch (e) {
    return "Error has ocurred";
  }
};

export default getPopularMovies;
