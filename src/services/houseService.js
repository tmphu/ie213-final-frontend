import { https } from "./configURL";

export const houseService = {
  getHousesByLocationId: (locationId, currentPage = 1, pageSize = 10) => {
    return https.get(
      `/api/v1/house/location/${locationId}?pageSize=${pageSize}&currentPage=${currentPage}`
    );
  },
  getHouseById: (id) => {
    return https.get(`/api/v1/house/details/${id}`);
  },
  getBookedHouse: (userId, currentPage = 1, pageSize = 10) => {
    return https.get(`/api/v1/booking/?userId=${userId}&pageSize=${pageSize}&currentPage=${currentPage}`);
  },
  getHousePagination: (hostId, currentPage = 1, pageSize = 10) => {
    return https.get(
      `/api/v1/house/host/${hostId}?&pageSize=${pageSize}&currentPage=${currentPage}`
    );
  },
  updateHouse: (data) => {
    return https.put(`/api/v1/house/${data.id}`, data);
  },
  addHouse: (data) => {
    return https.post("/api/v1/house/", data);
  },

  
  
  getCommentByHouseId: (houseId) => {
    return https.get(`/api/binh-luan/lay-binh-luan-theo-phong/${houseId}`);
  },
};
