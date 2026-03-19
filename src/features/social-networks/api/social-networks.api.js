import http from "@/shared/api/http";

/**
 * Monitor ijtimoiy tarmoqlar API.
 * @property {Function} getAll - Barcha ijtimoiy tarmoqlar ro'yxati
 */
export const socialNetworksAPI = {
  getAll: () => http.get("/monitor/social-networks"),
};
