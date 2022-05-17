import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import trailerReducer from "../features/trailerSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    trailer: trailerReducer,
  },
});
