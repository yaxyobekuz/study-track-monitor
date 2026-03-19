import http from "@/shared/api/http";

/**
 * Monitor sinflar API.
 * @property {Function} getAll - Barcha sinflar ro'yxati
 * @property {Function} getStudents - Sinfdagi o'quvchilar ro'yxati
 */
export const classesAPI = {
  getAll: () => http.get("/monitor/classes"),
  getStudents: (classId) =>
    http.get(`/monitor/classes/${classId}/students`),
};
