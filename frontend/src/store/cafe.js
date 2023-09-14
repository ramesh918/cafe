import { createSlice } from "@reduxjs/toolkit";

const initialCafeState = {
  cafes: [],
  locations: [],
};

const cafeSlice = createSlice({
  name: "cafe",
  initialState: initialCafeState,
  reducers: {
    getCafes(state, action) {
      state.cafes = action.payload.cafes;
    },
    getLocations(state, action) {
      state.locations = action.payload.locations;
    },
  },
});

export const cafeActions = cafeSlice.actions;

export default cafeSlice.reducer;
