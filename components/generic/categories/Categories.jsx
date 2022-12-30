import s from "../../../styles/movies.module.scss";
import { useRouter } from "next/router";
import { AiOutlineDown } from "react-icons/ai";

const Categories = ({ genres }) => {
  const router = useRouter();
  const isChecked = router?.asPath?.split("search=")[1]?.split("~");

  return (
    <form
      className={s.form}
      onSubmit={(e) => {
        e.preventDefault();
        const ul = document.querySelector(".genres_container");
        const genresPassed = [];
        ul.childNodes.forEach((el) => {
          if (el.childNodes[0].checked)
            genresPassed.push(el.childNodes[0].name);
        });
        genresPassed.length === 0
          ? router.push(``)
          : router.push(`?search=${genresPassed.join("~")}`);
      }}
    >
      <button
        type="button"
        onClick={() => {
          const ul = document.getElementById("categories_movies-form");
          if (ul.style.opacity == 0) {
            ul.style.opacity = 1;
            ul.style.transform = "translateY(0px)";
          } else {
            ul.style.opacity = 0;
            setTimeout(() => {
              ul.style.transform = "translateY(-999999px)";
            }, 300);
          }
        }}
      >
        <span>Genres</span>
        <AiOutlineDown />
      </button>

      <div id="categories_movies-form" style={{ opacity: 0 }}>
        <ul className="genres_container">
          {genres.map((genre, i) => {
            return (
              <li key={i}>
                <input
                  id={`${genre}_id`}
                  name={genre}
                  type="checkbox"
                  value={genre}
                  defaultChecked={isChecked?.includes(genre)}
                  onClick={() => {
                    const label = document.getElementById(`for_${genre}`);
                    label.classList.contains(s.active_genre_form)
                      ? label.classList.remove(s.active_genre_form)
                      : label.classList.add(s.active_genre_form);
                  }}
                />
                <label
                  htmlFor={`${genre}_id`}
                  id={`for_${genre}`}
                  className={
                    isChecked?.includes(genre) ? s.active_genre_form : null
                  }
                >
                  {genre}
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="submit"
        onClick={() => {
          const ul = document.getElementById("categories_movies-form");
          ul.style.opacity = 0;
          setTimeout(() => {
            ul.style.transform = "translateY(-999999px)";
          }, 300);
        }}
      >
        Filter
      </button>
    </form>
  );
};

export default Categories;
