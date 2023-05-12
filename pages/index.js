import Head from "next/head.js";
import Spotlight from "../components/Spotlight/index.js";
import useStore from "@/lib/useStore.js";

export default function SpotlightPage() {
  const pieces = useStore((state) => state.pieces);
  const artPiecesInfo = useStore((state) => state.artPiecesInfo);
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const spotlightPiece =
    pieces[Math.floor(Math.random() * (pieces.length - 1))];

  return (
    <>
      <Head>
        <title>Art Gallery - Spotlight</title>
      </Head>
      {spotlightPiece && (
        <Spotlight
          image={spotlightPiece.imageSource}
          artist={spotlightPiece.artist}
          isFavorite={
            artPiecesInfo.find((piece) => piece.slug === spotlightPiece.slug)
              ?.isFavorite
          }
          onToggleFavorite={() => toggleFavorite(spotlightPiece.slug)}
        />
      )}
    </>
  );
}
