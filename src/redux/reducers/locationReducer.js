import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationInfo: null,
};

const locationReducer = createSlice({
  name: "locationReducer",
  initialState,
  reducers: {
    setLocationInfo: (state, action) => {
      state.locationInfo = action.payload;
    },
  },
});

export const { setLocationInfo } = locationReducer.actions;

export default locationReducer.reducer;
