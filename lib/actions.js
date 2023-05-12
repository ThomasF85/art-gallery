import { ADD_COMMENT, SET_PIECES, TOGGLE_FAVORITE } from "./actionTypes";

export const addCommentAction = (slug, newComment) => ({
  type: ADD_COMMENT,
  payload: { slug, newComment },
});

export const toggleFavoriteAction = (slug) => ({
  type: TOGGLE_FAVORITE,
  payload: slug,
});

export const fetchPieces = () => async (dispatch) => {
  const response = await fetch("https://example-apis.vercel.app/api/art");
  if (!response.ok) {
    throw new Error(`Request with ${JSON.stringify(args)} failed.`);
  }
  const pieces = await response.json();
  dispatch({
    type: SET_PIECES,
    payload: pieces,
  });
};
