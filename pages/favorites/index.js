import { useContext } from "react";
import ArtPiecePreview from "@/components/ArtPiecePreview";
import { ArtPiecesInfoContext } from "../_app";
import styled from "styled-components";

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

export default function FavoritesPage() {
  const artPiecesInfo = useContext(ArtPiecesInfoContext);
  const favorites = artPiecesInfo
    .filter((piece) => piece.isFavorite)
    .map((piece) => piece.slug);

  return (
    <List>
      {favorites?.map((piece) => (
        <li key={piece}>
          <ArtPiecePreview slug={piece} isFavorite />
        </li>
      ))}
    </List>
  );
}
