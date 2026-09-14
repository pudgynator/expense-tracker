import { Sidebar } from "../components/Sidebar";
import { Dashboard } from "../pages/Dashboard/Dashboard";

export function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Dashboard />
    </div>
  );
}
