import { ADD_COMMENT, SET_PIECES, TOGGLE_FAVORITE } from "./actionTypes";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      const { slug, newComment } = action.payload;
      if (state.piecesInfo.find((piece) => piece.slug === slug)) {
        return {
          ...state,
          piecesInfo: state.piecesInfo.map((pieceInfo) => {
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
          }),
        };
      } else {
        return {
          ...state,
          piecesInfo: [
            ...state.piecesInfo,
            { slug, isFavorite: false, comments: [newComment] },
          ],
        };
      }
    case TOGGLE_FAVORITE:
      if (state.piecesInfo.find((piece) => piece.slug === action.payload)) {
        return {
          ...state,
          piecesInfo: state.piecesInfo.map((pieceInfo) =>
            pieceInfo.slug === action.payload
              ? { ...pieceInfo, isFavorite: !pieceInfo.isFavorite }
              : pieceInfo
          ),
        };
      } else {
        return {
          ...state,
          piecesInfo: [
            ...state.piecesInfo,
            { slug: action.payload, isFavorite: true },
          ],
        };
      }
    case SET_PIECES:
      return {
        ...state,
        pieces: action.payload,
      };
    default:
      console.error(`unknown action type ${action.type}`);
      return state;
  }
};

export default reducer;
