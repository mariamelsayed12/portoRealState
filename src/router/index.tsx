
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../pages/Layout";
import HomePage from "../pages";
import BuyPage from "../pages/buy";
import SellPage from "../pages/sell";
import RentPage from "../pages/rent";
import ManagementPage from "../pages/management";





const router = createBrowserRouter(
    createRoutesFromElements(
    <>
    {/* home layout */}
    
    {/* errorElement={<ErrorRouteHandler/>} */}
    <Route path="/" element={<RootLayout/>} >

    <Route index  element={<HomePage/>} />
            <Route path="/buy" element={<BuyPage/>} />
            <Route path="/sell" element={<SellPage  />} />
            <Route path="/rent" element={<RentPage/>} />
            <Route path="/management" element={<ManagementPage/>} />

    </Route>

    {/* <Route path="*" element={<PageNotfound/>} /> */}
    
    </>
    
))

export default router;