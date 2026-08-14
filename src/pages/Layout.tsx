import { useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { FaWhatsapp } from "react-icons/fa6";
import { useGetPropertyQuery } from "../app/services/crudproperties";
import { useAppDispatch } from "../app/store";
import { syncFavoritesAction } from "../app/feature/favoriteUnitSlice";
import { useTranslation } from "react-i18next";
import { useGetVillageByIdQuery } from "../app/services/crudVillage";

const RootLayout = () => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const { data: units = [], isSuccess } = useGetPropertyQuery({ lang: i18n.language });
  const dispatch = useAppDispatch();

  // Fetch village status for transparent/light header logic
  const isDestinationDetailsPage = !!slug && !location.pathname.includes("/properties/");
  const { data: village, isSuccess: isVillageSuccess } = useGetVillageByIdQuery(
    { id: slug || "", lang: i18n.language },
    { skip: !isDestinationDetailsPage }
  );

  useEffect(() => {
    if (isSuccess && units) {
      const validIds = units.map((u) => u._id);
      dispatch(syncFavoritesAction(validIds));
    }
  }, [isSuccess, units, dispatch]);

  useEffect(() => {
    console.log("RootLayout Mounted");
    return () => console.log("RootLayout Unmounted");
  }, []);
  const isHomePage =
    location.pathname === "/" ||
    location.pathname.startsWith("/home") ||
    location.pathname.startsWith("/destination") ||
    location.pathname === "/sell" ||
    location.pathname === "/management" ||
    location.pathname === "/about" ||
    location.pathname === "/need-help";

  const isPropertyDetails = location.pathname.includes("/properties/");
  const isFavoritesPage = location.pathname === "/favorites";
  
  const isBuyPage = location.pathname === "/buy" || location.pathname === "/rent" || location.pathname === "/need-help";

  // Light variant is active on default pages, OR on destination details page when not yet successfully loaded
  const isNavbarLight =
    isPropertyDetails ||
    isFavoritesPage ||
    isBuyPage ||
    (isDestinationDetailsPage ? !(isVillageSuccess && village) : false);

  return (
    <div className="bg-background text-text-darker min-h-screen flex flex-col">
      {/* Navbar floats over the page via absolute positioning */}
      <Navbar variant={isNavbarLight ? "light" : "transparent"} />

      {/* Page content — simple block flow, never clipped */}
      <main className={isHomePage ? "flex-1" : "pt-36 px-5 max-w-7xl mx-auto w-full flex-1"}>
        <Outlet />
      </main>
      <a
  href="https://wa.me/#"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md hover:bg-[#20ba59] transition-all duration-300 hover:scale-110"
  aria-label="Contact us on WhatsApp"
>
  <FaWhatsapp className="text-background w-5 h-5" />
    </a>

      <Footer />
    </div>
  );
};

export default RootLayout;