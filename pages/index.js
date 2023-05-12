import Head from "next/head.js";
import Spotlight from "../components/Spotlight/index.js";
import { useContext } from "react";
import { ArtPiecesContext, ArtPiecesInfoContext } from "./_app.js";

export default function SpotlightPage() {
  const { pieces, onToggleFavorite } = useContext(ArtPiecesContext);
  const artPiecesInfo = useContext(ArtPiecesInfoContext);

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
          onToggleFavorite={() => onToggleFavorite(spotlightPiece.slug)}
        />
      )}
    </>
  );
}
