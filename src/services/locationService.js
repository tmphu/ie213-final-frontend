import { https } from "./configURL";

export const locationService = {
  getLocation: (currentPage = 1, pageSize = 10) => {
    return https.get(
      `/api/v1/location/?pageSize=${pageSize}&currentPage=${currentPage}`
    );
  },

  addLocation: (location) => {
    return https.post("/api/vi-tri", location);
  },
  getCityList: () => {
    return https.get("/api/vi-tri/");
  },
  getLocationById: (locationId) => {
    return https.get(`/api/vi-tri/${locationId}`);
  },
  editLocation: (location) => {
    return https.put(`/api/vi-tri/${location.id}`, location);
  },
  deleteLocation: (locationId) => {
    return https.delete(`/api/vi-tri/${locationId}`);
  },
};
