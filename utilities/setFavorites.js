export default function setFavorites(pop, test = false) {
  if (!test) {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    const toDelete = favorites.some(({ id }) => id === pop.id);

    toDelete
      ? (favorites = favorites.filter(({ id }) => id !== pop.id))
      : favorites.push({ ...pop });

    localStorage.setItem("favorites", JSON.stringify(favorites));
  } else {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    let toDelete;
    favorites ? (toDelete = favorites.some(({ id }) => id === pop.id)) : null;
    return toDelete;
  }
}
