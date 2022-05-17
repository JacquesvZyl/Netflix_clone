import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trailerKey: null,
};

export const trailerSlice = createSlice({
  name: "trailer",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTrailerKey: (state, action) => {
      state.trailerKey = action.payload;
    },
    removeTrailerKey: (state) => {
      state.trailerKey = null;
    },
  },
});

export const { setTrailerKey, removeTrailerKey } = trailerSlice.actions;

export default trailerSlice.reducer;
