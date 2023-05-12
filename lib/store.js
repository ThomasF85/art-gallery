import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import thunk from "redux-thunk";

const initialState = {
  pieces: [],
  piecesInfo: [],
};

export default configureStore({
  reducer,
  middleware: [thunk],
  preloadedState: initialState,
});
