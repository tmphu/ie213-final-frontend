import axios from "axios";
import { setLoadingOff, setLoadingOn } from "../redux/reducers/loadingReducer";
import { userLocalService } from "./localStorageService";
import { store } from "..";

export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const PAYMENT_SERVICE_URL = process.env.REACT_APP_PAYMENT_SERVICE_BASE_URL;

export const createConfig = () => {
  return {
    token: userLocalService.getItem()?.token,
  };
};

export const https = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: createConfig(),
});

https.interceptors.request.use(
  function (config) {
    store.dispatch(setLoadingOn());
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

https.interceptors.response.use(
  function (response) {
    store.dispatch(setLoadingOff());
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);


export const paymentHttps = axios.create({
  baseURL: PAYMENT_SERVICE_URL,
  timeout: 30000,
  headers: createConfig(),
});

paymentHttps.interceptors.request.use(
  function (config) {
    store.dispatch(setLoadingOn());
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

paymentHttps.interceptors.response.use(
  function (response) {
    store.dispatch(setLoadingOff());
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);