import "react-toastify/dist/ReactToastify.css";
import tw, { GlobalStyles } from "twin.macro";
import Navbar from "../components/nav/Navbar";
import "../styles/globals.css";
import { PersistGate } from "redux-persist/integration/react";
import { Store, Persistor } from "../redux/store";
import { Provider, useSelector } from "react-redux";
import Sidebar from "../components/sidebar/sidebar";
import "../styles/svg.css";
import Head from "next/head";
import { ToastContainer, toast, Flip } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import countapi from "countapi-js";
const Msg = ({ resumeId }) => {
  return (
    <div className="flex flex-col">
      <span>You were watching</span>
      <span className={"uppercase font-bold text-xl"}>
        {resumeId[0].split("-").join(" ")}
      </span>
      <span>
        To Continue Press <span className="text-red-700 text-xl ">here</span>
      </span>
    </div>
  );
};

const App = ({ Component, pageProps }) => {
  const [visit, setVisit] = useState(0);
  const { theme, resumeId } = useSelector((state) => state);
  const router = useRouter();
  useEffect(() => {
    if (resumeId) toast.info(<Msg resumeId={resumeId} />);
    countapi
      .update("animex.ninja", "864a5feb-66ee-4c0d-97a6-2f76c1d7e6ad", 1)
      .then((result) => {
        setVisit(result.value);
      });
  }, []);
  return (
    <div className={`${theme.background}  `}>
      <Head>
        <title>Animex</title>
        <meta charset="utf-8" />
        <link rel="icon" href={"/shuriken.svg"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Premium anime streaming experience "
        />
        <meta
          name="keywords"
          content="Watching,Popular,Streaming,Free,Fast,1080p,"
        />
      </Head>
      <Sidebar visit={visit} />
      <GlobalStyles />
      <div className="flex justify-between">
        <Navbar visit={visit} />
        <Component {...pageProps} />
      </div>
      <ToastContainer
        position={"top-center"}
        onClick={() => router.push(`/watching/${resumeId[0]}/${resumeId[1]}`)}
        autoClose={false}
        transition={Flip}
      />
    </div>
  );
};

const MYapp = ({ Component, pageProps }) => (
  <Provider store={Store}>
    <PersistGate loading={null} persistor={Persistor}>
      <App Component={Component} pageProps={pageProps} />
    </PersistGate>
  </Provider>
);
export default MYapp;