import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  savedShows: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    addSavedShow: (state, action) => {
      state.savedShows.push(action.payload);
    },
    removeSavedShow: (state, action) => {
      const filtered = state.savedShows.filter(
        (show) => show.id !== action.payload.id
      );
      state.savedShows = filtered;
    },
  },
});

export const { login, logout, addSavedShow, removeSavedShow } =
  userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectSavedShows = (state) => state.user.savedShows;

export default userSlice.reducer;
