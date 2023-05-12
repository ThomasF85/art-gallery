import ArtPiecePreview from "@/components/ArtPiecePreview";
import useStore from "@/lib/useStore";
import styled from "styled-components";
import deepEqual from "fast-deep-equal";

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
  const pieces = useStore(
    (state) => state.pieces.map((piece) => piece.slug),
    deepEqual
  );

  return (
    <List>
      {pieces?.map((piece) => (
        <li key={piece}>
          <ArtPiecePreview slug={piece} />
        </li>
      ))}
    </List>
  );
}
