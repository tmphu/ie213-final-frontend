import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingInfo: {},
}

const bookingReducer = createSlice({
  name: 'bookingReducer',
  initialState,
  reducers: {
    setBookingInfo: (state, action) => {
      state.bookingInfo = action.payload;
    },
  },
})

export const { setBookingInfo } = bookingReducer.actions;

export default bookingReducer.reducer;