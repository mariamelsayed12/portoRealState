import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const RootLayout = () => {
  const location = useLocation();
  const isHomePage =
    location.pathname === "/" ||
    location.pathname.startsWith("/home") ||
    location.pathname.startsWith("/destination");

  return (
    <div className="bg-background text-text-darker min-h-screen flex flex-col">
      {/* Navbar floats over the page via absolute positioning */}
      <Navbar />

      {/* Page content — simple block flow, never clipped */}
      <main className={isHomePage ? "flex-1" : "pt-36 px-5 max-w-7xl mx-auto w-full flex-1"}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;