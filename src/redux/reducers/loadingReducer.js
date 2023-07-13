import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const loadingReducer = createSlice({
  name: "loadingReducer",
  initialState,
  reducers: {
    setLoadingOn: (state, action) => {
      state.isLoading = true;
    },
    setLoadingOff: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { setLoadingOn, setLoadingOff } = loadingReducer.actions;

export default loadingReducer.reducer;
