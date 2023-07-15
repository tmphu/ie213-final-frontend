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
  bookHouse: (data) => {
    return https.post("/api/v1/booking/", data);
  },
  getBookedHouse: (userId, currentPage = 1, pageSize = 10) => {
    return https.get(`/api/v1/booking/?userId=${userId}&pageSize=${pageSize}&currentPage=${currentPage}`);
  },

  
  addHouse: (house) => {
    return https.post("/api/phong-thue", house);
  },
  getHousePagination: (currentPage) => {
    return https.get(
      `api/phong-thue/phan-trang-tim-kiem?pageIndex=${currentPage}&pageSize=10`
    );
  },
  getCommentByHouseId: (houseId) => {
    return https.get(`/api/binh-luan/lay-binh-luan-theo-phong/${houseId}`);
  },
  editHouse: (house) => {
    return https.put(`/api/phong-thue/${house.id}`, house);
  },
  deleteHouse: (houseId) => {
    return https.delete(`/api/phong-thue/${houseId}`);
  },
};
