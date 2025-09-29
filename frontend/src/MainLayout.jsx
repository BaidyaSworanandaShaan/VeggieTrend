import React from "react";
import { Outlet } from "react-router-dom";
import LanguageSwitcher from "./components/LanguageSwitcher";

const MainLayout = () => {
  return (
    <div>
      <LanguageSwitcher />

      {/* Page content */}
      <Outlet />
    </div>
  );
};

export default MainLayout;
