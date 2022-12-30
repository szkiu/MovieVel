import s from "../../../styles/Home.module.scss";
import Nav from "./nav/Nav";
import Search from "./search/Search";
const Header = ({disabled}) => {
  return (
    <header className={s.header}>
      <Search disabled={disabled} />

      <Nav />
    </header>
  );
};

export default Header;
