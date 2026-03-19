// Router
import { Navigate, Outlet } from "react-router-dom";

/**
 * Monitor kodini tekshiruvchi guard.
 * localStorage da "monitorCode" mavjud bo'lsa child routelarni ko'rsatadi,
 * aks holda kod kiritish sahifasiga yo'naltiradi.
 *
 * @returns {import("react").ReactElement}
 */
const MonitorGuard = () => {
  const monitorCode = localStorage.getItem("monitorCode");

  if (!monitorCode) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default MonitorGuard;
