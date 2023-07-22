import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationInfo: {},
  searchLocation: {},
};

const locationReducer = createSlice({
  name: "locationReducer",
  initialState,
  reducers: {
    setLocationInfo: (state, action) => {
      state.locationInfo = action.payload;
    },
    setSearchLocation: (state, action) => {
      state.searchLocation = action.payload;
    },
  },
});

export const { setLocationInfo, setSearchLocation } = locationReducer.actions;

export default locationReducer.reducer;
