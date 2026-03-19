// Components
import Tabs from "@/shared/components/ui/Tabs";

// Assets
import { logoIcon } from "@/shared/assets/icons";

// React Router
import { Outlet, useLocation } from "react-router-dom";

// Data
import { monitorTabs } from "@/features/dashboard/data/tabs.data";

const MonitorLayout = () => {
  const { pathname } = useLocation();

  const activeTab =
    monitorTabs.find((tab) => tab.path === pathname)?.value || "schedules";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between container px-6">
          {/* Logo */}
          <div className="flex items-center gap-4 h-16">
            <img src={logoIcon} alt="MBSI School logo" className="size-8" />
            <h1 className="text-xl font-bold text-gray-900">MBSI School</h1>
          </div>

          {/* Tablar */}
          <Tabs
            items={monitorTabs}
            value={activeTab}
            getItemHref={(item) => item.path}
          />
        </div>
      </header>

      {/* Content */}
      <main className="container px-6 pt-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MonitorLayout;
