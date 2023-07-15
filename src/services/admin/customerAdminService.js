import { https } from "../configURL";

export const customerAdminService = {
  getCustomerPagination: (currentPage = 1, pageSize = 10) => {
    return https.get(
      `/api/v1/customer/?pageSize=${pageSize}&currentPage=${currentPage}`
    );
  },


  
  addUser: (user) => {
    return https.post("api/users", user);
  },
  getUserList: () => {
    return https.get("api/users");
  },
  getUserById: (userId) => {
    return https.get(`api/users/${userId}`);
  },
  editUser: (user) => {
    return https.put(`api/users/${user.id}`, user);
  },
  deleteUser: (userId) => {
    return https.delete(`api/users?id=${userId}`);
  },
};
