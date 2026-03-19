// Router
import {
  Route,
  Outlet,
  Navigate,
  Routes as RoutesWrapper,
} from "react-router-dom";

const Routes = () => {
  return (
    <RoutesWrapper>
      {/* Protected routes */}
      <Route element={<Outlet />}>
        <Route path="/" element={<div>New Routes Coming Soon</div>} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </RoutesWrapper>
  );
};

export default Routes;
