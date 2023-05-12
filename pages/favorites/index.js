import { useAtom } from "jotai";
import { piecesAtom, piecesInfoAtom, toggleFavoriteAtom } from "../_app.js";
import styled from "styled-components";
import ArtPiecePreview from "@/components/ArtPiecePreview";

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
  const [artPiecesInfo] = useAtom(piecesInfoAtom);
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
