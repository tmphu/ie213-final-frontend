import { https } from "../configURL";

export const customerAdminService = {
  getCustomerPagination: (currentPage = 1, pageSize = 10) => {
    return https.get(
      `/api/v1/customer/?pageSize=${pageSize}&currentPage=${currentPage}`
    );
  },
  getCustomerById: (customerId) => {
    return https.get(`/api/v1/customer/${customerId}`);
  },
  updateCustomer: (customer) => {
    return https.put(`/api/v1/customer/${customer.id}`, customer);
  },

  
  addUser: (user) => {
    return https.post("api/users", user);
  },
  getUserList: () => {
    return https.get("api/users");
  },
  deleteUser: (userId) => {
    return https.delete(`api/users?id=${userId}`);
  },
};
