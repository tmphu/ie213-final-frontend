import { paymentHttps } from "./configURL";

export const paymentService = {
  getPaymentUrl: (payload) => {
    return paymentHttps.post(`/payments`, payload);
  },
};
