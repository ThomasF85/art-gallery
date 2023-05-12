import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      isLoading: true,
      pieces: [],
      artPiecesInfo: [],
      initialize: async () => {
        const response = await fetch("https://example-apis.vercel.app/api/art");
        if (!response.ok) {
          throw new Error(`Request with ${JSON.stringify(args)} failed.`);
        }
        set({ pieces: await response.json(), isLoading: false });
      },
      toggleFavorite: (slug) =>
        set(({ artPiecesInfo }) => {
          const artPiece = artPiecesInfo.find((piece) => piece.slug === slug);
          return {
            artPiecesInfo: artPiece
              ? artPiecesInfo.map((pieceInfo) =>
                  pieceInfo.slug === slug
                    ? { ...pieceInfo, isFavorite: !pieceInfo.isFavorite }
                    : pieceInfo
                )
              : [...artPiecesInfo, { slug, isFavorite: true }],
          };
        }),
      addComment: (slug, newComment) =>
        set(({ artPiecesInfo }) => {
          const artPiece = artPiecesInfo.find((piece) => piece.slug === slug);
          return {
            artPiecesInfo: artPiece
              ? artPiecesInfo.map((pieceInfo) => {
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
                })
              : [
                  ...artPiecesInfo,
                  { slug, isFavorite: false, comments: [newComment] },
                ],
          };
        }),
    }),
    {
      name: "art-gallery-storage",
      partialize: (state) => ({ artPiecesInfo: state.artPiecesInfo }),
    }
  )
);

export default useStore;
