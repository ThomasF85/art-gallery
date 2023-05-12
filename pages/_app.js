import GlobalStyle from "../styles";
import Layout from "../components/Layout.js";
import useStore from "@/lib/useStore";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const initialize = useStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Layout>
      <GlobalStyle />
      <Component {...pageProps} />
    </Layout>
  );
}
