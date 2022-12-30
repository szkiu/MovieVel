import { useEffect, useState } from "react";
import {
  HiMagnifyingGlass,
  HiOutlineUser,
  HiHome,
  HiFire,
  HiComputerDesktop,
} from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { SiMyanimelist } from "react-icons/si";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  const [mql, setMql] = useState();

  useEffect(() => {
    setMql(matchMedia("(max-width: 1280px)"));
  }, []);

  return (
    <nav
      style={
        mql?.matches
          ? {
              transform: "translateY(-999rem)",
              opacity: 0,
              transition: "opacity .2s",
            }
          : null
      }
      id="menu"
    >
      {mql?.matches ? (
        <AiOutlineClose
          onClick={() => {
            const nav = document.getElementById("menu");
            nav.style.opacity = 0;
            setTimeout(() => {
              nav.style.transform = "translateY(-999rem)";
            }, 200);
          }}
        />
      ) : null}
      <ul>
        <li>
          <Link
            href="/"
            className={router?.pathname === "/" ? "nav-active" : null}
          >
            <HiHome />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            href="/movies"
            className={router?.pathname === "/movies" ? "nav-active" : null}
          >
            <HiComputerDesktop />
            <span>Movies</span>
          </Link>
        </li>
        <li>
          <Link
            href="/anime"
            className={router?.pathname === "/anime" ? "nav-active" : null}
          >
            <SiMyanimelist />
            <span>Anime</span>
          </Link>
        </li>
        <li>
          <Link
            href="/favorites"
            className={router?.pathname === "/favorites" ? "nav-active" : null}
          >
            <AiFillHeart />
            <span>Favorites</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
