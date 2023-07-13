import { https } from "../configURL";

export const bookingService = {
  addBooking: (booking) => {
    return https.post("/api/dat-phong", booking);
  },
  getBookings: () => {
    return https.get("/api/dat-phong");
  },
  getBookingById: (bookingId) => {
    return https.get(`/api/dat-phong/${bookingId}`);
  },
  editBooking: (booking) => {
    return https.put(`/api/dat-phong/${booking.id}`, booking);
  },
  deleteBooking: (bookingId) => {
    return https.delete(`/api/dat-phong/${bookingId}`);
  },
};
