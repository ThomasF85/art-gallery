import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ArtPiecesDetails from "../../../components/ArtPiecesDetails";
import { useAtomValue, useAtom } from "jotai";
import { piecesAtom } from "@/lib/atoms/pieces";
import {
  addComment,
  piecesInfoAtom,
  toggleFavorite,
} from "@/lib/atoms/piecesInfo";

export default function ArtPieceDetailsPage() {
  const [selectedArtPiece, setSelectedArtPiece] = useState(null);
  const router = useRouter();
  const { slug } = router.query;
  const pieces = useAtomValue(piecesAtom);
  const [piecesInfo, dispatch] = useAtom(piecesInfoAtom);

  useEffect(() => {
    setSelectedArtPiece(pieces.find((piece) => piece.slug === slug));
  }, [setSelectedArtPiece, pieces, slug]);

  // redirect to 404, in case the piece couldn't be found within 3 seconds
  useEffect(() => {
    let timeoutId;
    if (!selectedArtPiece) {
      timeoutId = setTimeout(() => router.push("/404"), 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [selectedArtPiece, router]);

  const selectedArtPieceComments = piecesInfo.find(
    (piece) => piece.slug === selectedArtPiece?.slug
  )?.comments;

  if (!selectedArtPiece) {
    return null;
  }

  return (
    <ArtPiecesDetails
      onBack={() => router.back()}
      image={selectedArtPiece.imageSource}
      title={selectedArtPiece.name}
      artist={selectedArtPiece.artist}
      year={selectedArtPiece.year}
      genre={selectedArtPiece.genre}
      isFavorite={
        piecesInfo.find((piece) => piece.slug === selectedArtPiece.slug)
          ?.isFavorite
      }
      onToggleFavorite={() => dispatch(toggleFavorite(selectedArtPiece.slug))}
      colors={selectedArtPiece.colors}
      comments={selectedArtPieceComments}
      addComment={(newComment) =>
        dispatch(addComment(selectedArtPiece.slug, newComment))
      }
    />
  );
}
