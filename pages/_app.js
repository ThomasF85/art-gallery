import GlobalStyle from "../styles";
import useSWR from "swr";
import Layout from "../components/Layout.js";
import { createContext, useCallback, useMemo } from "react";
import useLocalStorageState from "use-local-storage-state";

export const ArtPiecesContext = createContext();
export const ArtPiecesInfoContext = createContext();

const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`Request with ${JSON.stringify(args)} failed.`);
  }
  return await response.json();
};

export default function App({ Component, pageProps }) {
  const { data, isLoading, error } = useSWR(
    "https://example-apis.vercel.app/api/art",
    fetcher
  );
  const [artPiecesInfo, setArtPiecesInfo] = useLocalStorageState(
    "art-pieces-info",
    { defaultValue: [] }
  );

  const handleToggleFavorite = useCallback((slug) => {
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

  const context = useMemo(
    () => ({
      pieces: isLoading || error ? [] : data,
      allSlugs: data ? data.map((piece) => piece.slug) : [],
      onToggleFavorite: handleToggleFavorite,
      addComment,
    }),
    [data, handleToggleFavorite, addComment, error, isLoading]
  );

  const artPiecesInfoValue = useMemo(() => artPiecesInfo, [artPiecesInfo]);

  return (
    <Layout>
      <GlobalStyle />
      <ArtPiecesContext.Provider value={context}>
        <ArtPiecesInfoContext.Provider value={artPiecesInfoValue}>
          <Component {...pageProps} />
        </ArtPiecesInfoContext.Provider>
      </ArtPiecesContext.Provider>
    </Layout>
  );
}
