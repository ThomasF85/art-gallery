import useStore from "@/lib/useStore";
import ArtPiecePreview from "@/components/ArtPiecePreview";
import styled from "styled-components";
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
  const pieces = useStore((state) =>
    state.artPiecesInfo
      .filter((piece) => piece.isFavorite)
      .map((piece) => piece.slug)
  );
  const isLoading = useStore((state) => state.isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <List>
      {pieces?.map((piece) => (
        <MemoizedListItem key={piece} piece={piece} />
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
