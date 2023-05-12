import { useAtom } from "jotai";
import ArtPiecePreview from "@/components/ArtPiecePreview/index.js";
import styled from "styled-components";
import { piecesAtom, usePiecesInfo } from "../_app";

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;

  li {
    width: 30rem;
    min-width: 10rem;
    height: 30rem;
  }
`;

export default function ArtPiecesPage() {
  const [pieces] = useAtom(piecesAtom);
  const { piecesInfo, toggleFavorite } = usePiecesInfo();

  return (
    <List>
      {pieces?.map((piece) => (
        <li key={piece.slug}>
          <ArtPiecePreview
            slug={piece.slug}
            isFavorite={
              piecesInfo?.find((artPiece) => artPiece.slug === piece.slug)
                ?.isFavorite
            }
            onToggleFavorite={toggleFavorite}
          />
        </li>
      ))}
    </List>
  );
}
