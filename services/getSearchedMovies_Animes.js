import axios from "axios";

const getSearchedMovies_Animes = async (search) => {
  const optionsMovies = {
    method: "GET",
    url: "https://ott-details.p.rapidapi.com/search",
    params: { title: search, page: "1" },
    headers: {
      "X-RapidAPI-Key": "7cf4bfbe74msh1ac5bedb15162bcp103bd8jsn797378ec92f9",
      "X-RapidAPI-Host": "ott-details.p.rapidapi.com",
    },
  };

  const optionsAnime = {
    method: "GET",
    url: "https://anime-db.p.rapidapi.com/anime",
    params: { page: "1", size: "60", search: search, sortOrder: "asc" },
    headers: {
      "X-RapidAPI-Key": "4b5dae2f18msh20b900154ed84afp1ced00jsn434cfb9566ec",
      "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
    },
  };

  const newDataMovie = [];
  const newDataAnime = [];
  try {
    const res = await axios.request(optionsMovies);
    res.data.results.forEach((data, i) => {
      newDataMovie.push({
        genre: data.genre,
        id: `ott~${data.imdbid}`,
        year: data.released,
        title: data.title,
        type: data.type,
      });
    });
    if (newDataMovie.length !== 0) return newDataMovie;

    const resAnime = await axios.request(optionsAnime);
    resAnime.data.data.forEach((data, i) => {
      newDataAnime.push({
        genre: data.genres,
        id: `anime~${data._id}`,
        title: data.title,
        type: data.type,
        ranking: data.ranking,
        episodes: data.episodes,
      });
    });
    return newDataAnime;
  } catch (e) {
    return `${e}, Error has ocurred`;
  }
};

export default getSearchedMovies_Animes;
