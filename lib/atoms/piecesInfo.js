import { atomWithStorage } from "jotai/utils";

export const addComment = (slug, newComment) => (prev) => {
  const artPiece = prev.find((piece) => piece.slug === slug);
  if (artPiece) {
    return prev.map((pieceInfo) => {
      if (pieceInfo.slug === slug) {
        return pieceInfo.comments
          ? {
              ...pieceInfo,
              comments: [...pieceInfo.comments, newComment],
            }
          : { ...pieceInfo, comments: [newComment] };
      } else {
        return pieceInfo;
      }
    });
  } else {
    return [...prev, { slug, isFavorite: false, comments: [newComment] }];
  }
};

export const toggleFavorite = (slug) => (prev) => {
  const artPiece = prev.find((piece) => piece.slug === slug);
  if (artPiece) {
    return prev.map((pieceInfo) => {
      if (pieceInfo.slug === slug) {
        return { ...pieceInfo, isFavorite: !pieceInfo.isFavorite };
      } else {
        return pieceInfo;
      }
    });
  } else {
    return [...prev, { slug, isFavorite: true }];
  }
};

export const piecesInfoAtom = atomWithStorage("art-gallery-storage", []);
