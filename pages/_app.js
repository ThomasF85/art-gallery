import GlobalStyle from "../styles";
import Layout from "../components/Layout.js";
import { useSetAtom } from "jotai";
import { piecesAtom } from "@/lib/atoms/pieces";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const setPieces = useSetAtom(piecesAtom);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://example-apis.vercel.app/api/art");
      if (!response.ok) {
        throw new Error(`Request with ${JSON.stringify(args)} failed.`);
      }
      setPieces(await response.json());
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <GlobalStyle />
      <Component {...pageProps} />
    </Layout>
  );
}
