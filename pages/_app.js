import GlobalStyle from "../styles";
import Layout from "../components/Layout.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { useDispatch } from "react-redux";
import store from "@/lib/store";
import { useEffect } from "react";
import { fetchPieces } from "@/lib/actions";
const persistor = persistStore(store);

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <GlobalStyle />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Page Component={Component} {...pageProps} />
        </PersistGate>
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
