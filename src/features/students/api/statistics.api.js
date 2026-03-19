import http from "@/shared/api/http";

/**
 * Monitor statistika API.
 * @property {Function} getStudentWeekly - O'quvchining haftalik statistikasini olish
 */
export const statisticsAPI = {
  getStudentWeekly: (studentId) =>
    http.get(`/monitor/statistics/weekly/${studentId}`),
};
