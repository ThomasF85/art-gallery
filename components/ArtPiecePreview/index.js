import { StyledImage } from "../StyledImage.js";
import styled from "styled-components";
import Link from "next/link.js";
import FavoriteButton from "../FavoriteButton/index.js";
import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import { piecesAtom } from "@/lib/atoms/pieces.js";
import { piecesInfoAtom, toggleFavorite } from "@/lib/atoms/piecesInfo.js";

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Figure = styled.figure`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
`;

const Caption = styled.figcaption`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: black;
  color: white;
  padding: 0.5rem 0.3rem;
`;

const Anchor = styled.a`
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

function ArtPiecePreview({ slug, isFavorite }) {
  const pieces = useAtomValue(piecesAtom);
  const dispatch = useSetAtom(piecesInfoAtom);
  const piece = pieces.find((piece) => piece.slug === slug);

  if (!piece) {
    return <div>Loading...</div>;
  }

  const { imageSource: image, artist, name: title } = piece;

  return (
    <Figure>
      <ImageContainer>
        <FavoriteButton
          isFavorite={isFavorite}
          onToggleFavorite={() => dispatch(toggleFavorite(slug))}
          positionAbsolute={true}
        />
        <StyledImage
          src={image}
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt=""
          aria-labelledby={`caption-${slug}`}
        />
      </ImageContainer>
      <Caption id={`caption-${slug}`}>{`${artist}: ${title}`}</Caption>
      <Link href={`art-pieces/${slug}`} passHref legacyBehavior>
        <Anchor>
          <ScreenReaderOnly>More Info</ScreenReaderOnly>
        </Anchor>
      </Link>
    </Figure>
  );
}

export default React.memo(ArtPiecePreview);
