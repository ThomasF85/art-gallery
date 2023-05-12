import Head from "next/head.js";
import Spotlight from "../components/Spotlight/index.js";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavoriteAction } from "@/lib/actions.js";

export default function SpotlightPage() {
  const pieces = useSelector((state) => state.pieces);
  const piecesInfo = useSelector((state) => state.piecesInfo);
  const dispatch = useDispatch();

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
            piecesInfo.find((piece) => piece.slug === spotlightPiece.slug)
              ?.isFavorite
          }
          onToggleFavorite={() =>
            dispatch(toggleFavoriteAction(spotlightPiece.slug))
          }
        />
      )}
    </>
  );
}
