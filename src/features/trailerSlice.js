import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trailerData: null,
};

export const trailerSlice = createSlice({
  name: "trailer",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTrailerData: (state, action) => {
      state.trailerData = action.payload;
    },
    removeTrailerData: (state) => {
      state.trailerData = null;
    },
  },
});

export const { setTrailerData, removeTrailerData } = trailerSlice.actions;

export default trailerSlice.reducer;
