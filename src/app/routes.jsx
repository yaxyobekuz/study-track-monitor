// Router
import { Route, Navigate, Routes as RoutesWrapper } from "react-router-dom";

// Guards
import MonitorGuard from "@/shared/components/guards/MonitorGuard";

// Layouts
import MonitorLayout from "@/shared/layouts/MonitorLayout";

// Pages
import CodeEntryPage from "@/features/auth/pages/CodeEntryPage";
import StudentsPage from "@/features/students/pages/StudentsPage";
import FullSchedulePage from "@/features/schedules/pages/FullSchedulePage";
import SchedulesTodayPage from "@/features/schedules/pages/SchedulesTodayPage";

const Routes = () => {
  return (
    <RoutesWrapper>
      {/* Kod kiritish sahifasi */}
      <Route path="/" element={<CodeEntryPage />} />

      {/* Monitor kod bilan himoyalangan */}
      <Route element={<MonitorGuard />}>
        <Route element={<MonitorLayout />}>
          {/* Tab sahifalari */}
          <Route path="/schedules-today" element={<SchedulesTodayPage />} />
          <Route path="/students" element={<StudentsPage />} />

          {/* To'liq dars jadvali (alohida sahifa) */}
          <Route path="/schedules" element={<FullSchedulePage />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </RoutesWrapper>
  );
};

export default Routes;
