import { Outlet } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

const DashboardLayout = () => {
  return (
    <div className="d-flex vh-100">

      <Sidebar />

      <div className="flex-grow-1 d-flex flex-column">

        <Navbar />

        <main className="flex-grow-1 p-4 bg-light">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;