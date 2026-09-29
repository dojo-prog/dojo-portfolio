import Navbar from "@/components/layout/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
