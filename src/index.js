import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import userReducer from "./redux/reducers/userReducer";
import loadingReducer from "./redux/reducers/loadingReducer";
import locationReducer from "./redux/reducers/locationReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    loadingReducer: loadingReducer,
    locationReducer: locationReducer,
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
