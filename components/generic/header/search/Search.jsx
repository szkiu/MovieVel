import s from "../../../../styles/search.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { HiOutlineUser, HiMagnifyingGlass } from "react-icons/hi2";
import { AiOutlineMenu } from "react-icons/ai";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import Link from "next/link";

const Search = ({ yourClass, disabled }) => {
  const router = useRouter();
  const [userModal, setUserModal] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const [user, setUser] = useState();
  const [mql, setMql] = useState();

  useEffect(() => {
    setUser(localStorage.getItem("account"));
    setMql(matchMedia("(max-width: 1279px)"));
  }, []);

  const handlerSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?search=${e.target.search.value.replaceAll(" ", "~")}`);
  };

  return (
    <div className={yourClass}>
      <div onClick={() => router.push(`/`)} style={{ cursor: "pointer" }}>
        MOVIE<span>VEL</span>
      </div>

      <div>
        <form onSubmit={handlerSubmit}>
          <input
            type="text"
            placeholder="Search Movie"
            name="search"
            autoComplete="off"
          />
          <button type="submit">
            <HiMagnifyingGlass />
          </button>
        </form>

        <div className={s.user}>
          <HiOutlineUser
            onClick={() => (!disabled ? setUserModal(!userModal) : null)}
          />

          {mql?.matches ? (
            <AiOutlineMenu
              onClick={() => {
                const nav = document.getElementById("menu");
                nav.style.transform = "translateY(0)";
                nav.style.opacity = 1;
              }}
            />
          ) : null}

          {userModal ? (
            user ? (
              <div>
                <div>
                  <HiOutlineUser />
                  <span>{user ? JSON.parse(user).username : null}</span>
                </div>

                <div>
                  <div
                    onClick={() => {
                      localStorage.removeItem("account");
                      localStorage.removeItem("favorites");
                      location.reload();
                    }}
                  >
                    <BiLogOut />

                    <span>Log Out</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <HiOutlineUser />
                  <span>Unknown</span>
                </div>

                <div>
                  <Link href="/login">
                    <BiLogIn />

                    <span>Log In</span>
                  </Link>
                </div>
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Search;
