import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const RootLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="bg-background text-text-darker">
      {/* Navbar floats over the page via absolute positioning */}
      <Navbar />

      {/* Page content — simple block flow, never clipped */}
      <main className={isHomePage ? " " : "pt-36 px-5 max-w-7xl mx-auto w-full"}>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;