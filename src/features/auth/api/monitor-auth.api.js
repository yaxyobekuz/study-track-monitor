import http from "@/shared/api/http";

export const monitorAuthAPI = {
  verify: (code) => http.post("/monitor/verify", { code }),
};
