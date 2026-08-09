import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    console.log("HomePage Mounted");
    return () => console.log("HomePage Unmounted");
  }, []);

  return (
    <div >
      <Outlet />
    </div>
  );
};

export default HomePage;
