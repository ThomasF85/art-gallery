import { useSelector } from "react-redux";
import styled from "styled-components";
import ArtPiecePreview from "@/components/ArtPiecePreview";
import React from "react";

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
  const favorites = useSelector((state) =>
    state.piecesInfo.filter((piece) => piece.isFavorite)
  );

  return (
    <List>
      {favorites?.map((piece) => (
        <MemoizedListItem key={piece.slug} piece={piece.slug} />
      ))}
    </List>
  );
}

const MemoizedListItem = React.memo(({ piece }) => (
  <li>
    <ArtPiecePreview slug={piece} />
  </li>
));

MemoizedListItem.displayName = "ListItem";
