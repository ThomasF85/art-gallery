import useStore from "@/lib/useStore";
import ArtPieces from "../../components/ArtPieces";

export default function FavoritesPage() {
  const pieces = useStore((state) => state.pieces);
  const artPiecesInfo = useStore((state) => state.artPiecesInfo);

  const favorites = pieces.filter((piece) =>
    artPiecesInfo.find(
      (artPiece) => artPiece.slug === piece.slug && artPiece.isFavorite
    )
  );

  return <ArtPieces pieces={favorites} />;
}
