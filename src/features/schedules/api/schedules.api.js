import http from "@/shared/api/http";

/**
 * Monitor dars jadvali API.
 * @property {Function} getAllToday - Bugungi barcha sinf jadvallarini olish
 * @property {Function} getByClass - Sinf bo'yicha haftalik jadval olish
 */
export const schedulesAPI = {
  getAllToday: () => http.get("/monitor/schedules/all-today"),
  getByClass: (classId) => http.get(`/monitor/schedules/class/${classId}`),
};
