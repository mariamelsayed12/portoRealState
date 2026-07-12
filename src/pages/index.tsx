import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const isDetailsPage = location.pathname !== "/home" && location.pathname !== "/";

  return (
    <div className={isDetailsPage ? "pb-0" : "pb-24"}>
      <Outlet />
    </div>
  );
};

export default HomePage;
