import { https } from "./configURL";

export const locationService = {
  getLocation: (currentPage = 1, pageSize = 10) => {
    return https.get(
      `/api/v1/location/?pageSize=${pageSize}&currentPage=${currentPage}`
    );
  },
  getLocationById: (locationId) => {
    return https.get(`/api/v1/location/${locationId}`);
  },
  updateLocation: (location) => {
    return https.put(`/api/v1/location/${location.id}`, location);
  },
  addLocation: (location) => {
    return https.post("/api/v1/location/", location);
  },



  getCityList: () => {
    return https.get("/api/vi-tri/");
  },
  deleteLocation: (locationId) => {
    return https.delete(`/api/vi-tri/${locationId}`);
  },
};
