import { useAtom } from "jotai";
import { allSlugsAtom, piecesInfoAtom } from "../_app.js";
import ArtPiecePreview from "@/components/ArtPiecePreview/index.js";
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
  const [allSlugs] = useAtom(allSlugsAtom);
  const [artPiecesInfo] = useAtom(piecesInfoAtom);

  return (
    <List>
      {allSlugs?.map((piece) => (
        <li key={piece.slug}>
          <ArtPiecePreview
            slug={piece}
            isFavorite={
              artPiecesInfo?.find((artPiece) => artPiece.slug === piece)
                ?.isFavorite
            }
          />
        </li>
      ))}
    </List>
  );
}
