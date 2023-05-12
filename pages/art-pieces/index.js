import React, { useContext } from "react";
import { ArtPiecesContext, ArtPiecesInfoContext } from "../_app";
import ArtPiecePreview from "@/components/ArtPiecePreview";
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

export default function ArtPiecesPage() {
  const pieces = useContext(ArtPiecesContext);
  const artPiecesInfo = useContext(ArtPiecesInfoContext);

  return (
    <List>
      {pieces?.map(({ slug }) => (
        <li key={slug}>
          <ArtPiecePreview
            slug={slug}
            isFavorite={
              artPiecesInfo?.find((artPiece) => artPiece.slug === slug)
                ?.isFavorite
            }
          />
        </li>
      ))}
    </List>
  );
}
