import GlobalStyle from "../styles";
import Layout from "../components/Layout.js";
import { Provider } from "react-redux";
import { useDispatch } from "react-redux";
import store from "@/lib/store";
import { useEffect } from "react";
import { fetchPieces } from "@/lib/actions";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <GlobalStyle />
      <Provider store={store}>
        <Page Component={Component} {...pageProps} />
      </Provider>
    </Layout>
  );
}

const Page = ({ Component, ...pageProps }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPieces());
  }, []);

  return <Component {...pageProps} />;
};
