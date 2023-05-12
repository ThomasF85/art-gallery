import GlobalStyle from "../styles";
import Layout from "../components/Layout.js";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useCallback, useEffect } from "react";

const writablePiecesAtom = atom([]);
export const piecesAtom = atom((get) => get(writablePiecesAtom));

const piecesInfoAtom = atomWithStorage("art-gallery-storage", []);
export const usePiecesInfo = () => {
  const [piecesInfo, setPiecesInfo] = useAtom(piecesInfoAtom);

  const addComment = useCallback(
    (slug, newComment) =>
      setPiecesInfo((prev) => {
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

  const toggleFavorite = useCallback(
    (slug) =>
      setPiecesInfo((prev) => {
        const artPiece = prev.find((piece) => piece.slug === slug);
        if (artPiece) {
          return prev.map((pieceInfo) => {
            if (pieceInfo.slug === slug) {
              return { ...pieceInfo, isFavorite: !pieceInfo.isFavorite };
            } else {
              return pieceInfo;
            }
          });
        } else {
          return [...prev, { slug, isFavorite: true }];
        }
      }),
    []
  );

  return { piecesInfo, addComment, toggleFavorite };
};

export default function App({ Component, pageProps }) {
  const [, setPieces] = useAtom(writablePiecesAtom);

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
