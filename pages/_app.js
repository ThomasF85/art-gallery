import GlobalStyle from "../styles";
import useSWR from "swr";
import Layout from "../components/Layout.js";
import { createContext, useCallback, useMemo } from "react";
import useLocalStorageState from "use-local-storage-state";

export const ArtPiecesContext = createContext();
export const ArtPiecesInfoContext = createContext();
export const ArtPiecesInfoApiContext = createContext();

const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`Request with ${JSON.stringify(args)} failed.`);
  }
  return await response.json();
};

const PiecesContextProvider = ({ children }) => {
  const { data, isLoading, error } = useSWR(
    "https://example-apis.vercel.app/api/art",
    fetcher
  );

  return (
    <ArtPiecesContext.Provider value={isLoading || error ? [] : data}>
      {children}
    </ArtPiecesContext.Provider>
  );
};

const PiecesInfoContextProvider = ({ children }) => {
  const [artPiecesInfo, setArtPiecesInfo] = useLocalStorageState(
    "art-pieces-info",
    { defaultValue: [] }
  );

  const toggleFavorite = useCallback((slug) => {
    setArtPiecesInfo((prev) => {
      const artPiece = prev.find((piece) => piece.slug === slug);
      if (artPiece) {
        return prev.map((pieceInfo) =>
          pieceInfo.slug === slug
            ? { ...pieceInfo, isFavorite: !pieceInfo.isFavorite }
            : pieceInfo
        );
      } else {
        return [...prev, { slug, isFavorite: true }];
      }
    });
  }, []);

  const addComment = useCallback(
    (slug, newComment) =>
      setArtPiecesInfo((prev) => {
        const artPiece = prev.find((piece) => piece.slug === slug);
        if (artPiece) {
          return prev.map((pieceInfo) => {
            if (pieceInfo.slug === slug) {
              return pieceInfo.comments
                ? {
                    ...pieceInfo,
                    comments: [...pieceInfo.comments, newComment],
                  }
                : { ...pieceInfo, comments: [newComment] };
            } else {
              return pieceInfo;
            }
          });
        } else {
          return [...prev, { slug, isFavorite: false, comments: [newComment] }];
        }
      }),
    []
  );

  const apiContext = useMemo(
    () => ({
      addComment,
      toggleFavorite,
    }),
    [addComment, toggleFavorite]
  );

  return (
    <ArtPiecesInfoContext.Provider value={artPiecesInfo}>
      <ArtPiecesInfoApiContext.Provider value={apiContext}>
        {children}
      </ArtPiecesInfoApiContext.Provider>
    </ArtPiecesInfoContext.Provider>
  );
};

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <GlobalStyle />
      <PiecesContextProvider>
        <PiecesInfoContextProvider>
          <Component {...pageProps} />
        </PiecesInfoContextProvider>
      </PiecesContextProvider>
    </Layout>
  );
}
