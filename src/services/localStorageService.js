export const USER_LOGIN = "USER_LOGIN";

export const userLocalService = {
  setItem: (userData) => {
    let userJSON = JSON.stringify(userData);
    localStorage.setItem(USER_LOGIN, userJSON);
  },
  getItem: () => {
    let userJSON = localStorage.getItem(USER_LOGIN);
    if (userJSON !== null) {
      return JSON.parse(userJSON);
    } else {
      return null;
    }
  },
  removeItem: () => {
    localStorage.removeItem(USER_LOGIN);
  },
};
