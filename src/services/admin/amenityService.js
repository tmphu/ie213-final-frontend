import { https } from "../configURL";

export const amenityService = {
  getAmenity: (currentPage = 1, pageSize = 10) => {
    return https.get(
      `/api/v1/amenity/?pageSize=${pageSize}&currentPage=${currentPage}`
    );
  },
  getAmenityById: (id) => {
    return https.get(`/api/v1/amenity/${id}`);
  },
  updateAmenity: (data) => {
    return https.put(`/api/v1/amenity/${data.id}`, data);
  },
  addAmenity: (data) => {
    return https.post("/api/v1/amenity/", data);
  },
};
