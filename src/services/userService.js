import axios from "axios";
import { BASE_URL, https } from "./configURL";
import { userLocalService } from "./localStorageService";

export const userService = {
  postLogin: (dataUser) => {
    return https.post(`/api/v1/auth/login`, dataUser);
  },
  postSignup: (dataUser) => {
    return https.post(`/api/v1/auth/signup`, dataUser);
  },

  uploadAvatar: (formData) => {
    return axios({
      url: `${BASE_URL}api/users/upload-avatar`,
      method: "POST",
      data: formData,
      headers: {
        accept: "application/json",
        token: userLocalService.getItem()?.token,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
