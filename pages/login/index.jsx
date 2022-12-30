import s from "../../styles/Home.module.scss";
import sl from "../../styles/login.module.scss";
import Head from "next/head";
import Header from "../../components/generic/header/Header";
import Search from "../../components/generic/header/search/Search";
import Form from "../../components/form/Form";
import { useEffect, useState } from "react";

const Login = () => {
  const [mql, setMql] = useState();
  useEffect(() => {
    setMql(matchMedia("(max-width: 1279px)"));
  }, []);

  return (
    <>
      <Head>
        <title>MovieVel | Login</title>
      </Head>

      {mql?.matches ? (
        <Header disabled={true} />
      ) : (
        <Search yourClass={s.search} disabled={true} />
      )}

      <main className={sl.main}>
        <h1>Login to MovieVel</h1>

        <Form />
      </main>
    </>
  );
};

export default Login;
