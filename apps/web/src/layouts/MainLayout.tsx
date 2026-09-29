import Navbar from "@/components/layout/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
