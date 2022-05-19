import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plan: null,
};

export const subscriptionPlanSlice = createSlice({
  name: "subscriptionPlan",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addPlan: (state, action) => {
      state.plan = action.payload;
    },
    removePlan: (state) => {
      state.plan = null;
    },
  },
});

export const { addPlan, removePlan } = subscriptionPlanSlice.actions;

export default subscriptionPlanSlice.reducer;
