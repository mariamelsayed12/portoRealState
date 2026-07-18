import { RouterProvider } from "react-router-dom"
import router from "./router"
import { Toaster } from "react-hot-toast"
import { useTranslation } from "react-i18next";
import { useEffect } from "react";


function App() {

    const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir =
      i18n.language === "ar" ? "rtl" : "ltr";

    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <>
    <RouterProvider router={router} /> 
 <Toaster />
    </>
  )
}

export default App
