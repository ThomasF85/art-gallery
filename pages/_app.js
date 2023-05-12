import GlobalStyle from "../styles";
import Layout from "../components/Layout.js";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";

const writablePiecesAtom = atom([]);
export const piecesAtom = atom((get) => get(writablePiecesAtom));
export const allSlugsAtom = atom((get) =>
  get(writablePiecesAtom).map((piece) => piece.slug)
);

// Workaround since using derived atoms does not work currently with atomWithStorage
function persistedAtom(atom) {
  if (atom.state?.artPiecesInfo) {
    return atom.state.artPiecesInfo;
  }
  return atom;
}

const writablePiecesInfoAtom = atomWithStorage("art-gallery-storage", []);
export const piecesInfoAtom = atom((get) =>
  persistedAtom(get(writablePiecesInfoAtom))
);
export const addCommentAtom = atom(null, (get, set, ...args) => {
  const piecesInfo = persistedAtom(get(writablePiecesInfoAtom));
  const [slug, newComment] = args;
  const artPiece = piecesInfo.find((piece) => piece.slug === slug);
  if (artPiece) {
    set(
      writablePiecesInfoAtom,
      piecesInfo.map((pieceInfo) => {
        if (pieceInfo.slug === slug) {
          return pieceInfo.comments
            ? { ...pieceInfo, comments: [...pieceInfo.comments, newComment] }
            : { ...pieceInfo, comments: [newComment] };
        } else {
          return pieceInfo;
        }
      })
    );
  } else {
    set(writablePiecesInfoAtom, [
      ...piecesInfo,
      { slug, isFavorite: false, comments: [newComment] },
    ]);
  }
});
export const toggleFavoriteAtom = atom(null, (get, set, ...args) => {
  const piecesInfo = persistedAtom(get(writablePiecesInfoAtom));
  const [slug] = args;
  const artPiece = piecesInfo.find((piece) => piece.slug === slug);
  if (artPiece) {
    set(
      writablePiecesInfoAtom,
      piecesInfo.map((pieceInfo) => {
        if (pieceInfo.slug === slug) {
          return { ...pieceInfo, isFavorite: !pieceInfo.isFavorite };
        } else {
          return pieceInfo;
        }
      })
    );
  } else {
    set(writablePiecesInfoAtom, [...piecesInfo, { slug, isFavorite: true }]);
  }
});

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
