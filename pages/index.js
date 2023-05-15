import Head from "next/head.js";
import Spotlight from "../components/Spotlight/index.js";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { piecesAtom } from "@/lib/atoms/pieces.js";
import { piecesInfoAtom, toggleFavorite } from "@/lib/atoms/piecesInfo.js";

const ButtonContainer = styled.div`
  text-align: center;
`;

const Button = styled.button`
  background-color: lightcoral;
  border: 3px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

function randomIndex(arrayLength) {
  return Math.floor(Math.random() * (arrayLength - 1));
}

export default function SpotlightPage() {
  const [pieces] = useAtom(piecesAtom);
  const [piecesInfo, dispatch] = useAtom(piecesInfoAtom);
  const [index, setIndex] = useState(null);

  useEffect(() => {
    if (pieces) {
      setIndex(randomIndex(pieces.length));
    } else {
      setIndex(null);
    }
  }, [pieces]);

  const spotlightPiece = index === null ? null : pieces[index];

  return (
    <>
      <Head>
        <title>Art Gallery - Spotlight</title>
      </Head>
      {spotlightPiece && (
        <>
          <Spotlight
            image={spotlightPiece.imageSource}
            artist={spotlightPiece.artist}
            isFavorite={
              piecesInfo.find((piece) => piece.slug === spotlightPiece.slug)
                ?.isFavorite
            }
            onToggleFavorite={() =>
              dispatch(toggleFavorite(spotlightPiece.slug))
            }
          />
          <ButtonContainer>
            <Button
              type="button"
              onClick={() => setIndex(randomIndex(pieces.length))}
            >
              shuffle
            </Button>
          </ButtonContainer>
        </>
      )}
    </>
  );
}
