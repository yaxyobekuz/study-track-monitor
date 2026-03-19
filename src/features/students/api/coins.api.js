import http from "@/shared/api/http";

/**
 * Monitor tanga balansi API.
 * @property {Function} getBalance - O'quvchining tanga balansini olish
 */
export const coinsAPI = {
  getBalance: (studentId) =>
    http.get(`/monitor/coins/balance/${studentId}`),
};
