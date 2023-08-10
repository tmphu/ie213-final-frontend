import { https } from "../configURL";

export const bookingService = {
  getBookings: (hostId, currentPage = 1, pageSize = 10) => {
    return https.get(
      `/api/v1/booking/host/${hostId}?pageSize=${pageSize}&currentPage=${currentPage}`
    );
  },
  getBookingById: (bookingId) => {
    return https.get(`/api/v1/booking/details/${bookingId}`);
  },
  getBookingByCode: (bookingCode) => {
    return https.get(`/api/v1/booking/details/code/${bookingCode}`);
  },
  createBooking: (data) => {
    return https.post("/api/v1/booking/", data);
  },
  createPaymentTransaction: (data) => {
    return https.post("/api/v1/booking/payment", data);
  },
};
