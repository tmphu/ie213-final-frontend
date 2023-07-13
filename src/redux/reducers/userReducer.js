import { createSlice } from "@reduxjs/toolkit";
import { userLocalService } from "../../services/localStorageService";

const initialState = {
  userInfo: userLocalService.getItem(),
  userRegisterInfo: null,
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setUserRegisterInfo: (state, action) => {
      state.userRegisterInfo = action.payload;
    },
  },
});

export const { setUserInfo, setUserRegisterInfo } = userReducer.actions;

export default userReducer.reducer;
