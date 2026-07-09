
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import { Suspense } from "react";
import RootLayout from "../pages/Layout";
import HomePage from "../pages";
import BuyPage from "../pages/buy";
import SellPage from "../pages/sell";
import RentPage from "../pages/rent";
import ManagementPage from "../pages/management";
import HomeOverviewPage from "../pages/home/HomeOverviewPage";
import DestinationDetails from "../pages/DestinationDetails";





const router = createBrowserRouter(
    createRoutesFromElements(
    <>
    {/* home layout */}
    
    {/* errorElement={<ErrorRouteHandler/>} */}
    <Route path="/" element={<RootLayout/>} >

        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<HomePage/>}>
            <Route index element={<HomeOverviewPage />} />
            <Route path=":slug" element={
                <Suspense fallback={<div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 text-text-darker">Loading destination...</div>}>
                    <DestinationDetails/>
                </Suspense>
            } />
        </Route>

                        <Route path="buy" element={<BuyPage/>} />
                        <Route path="sell" element={<SellPage  />} />
                        <Route path="rent" element={<RentPage/>} />
                        <Route path="management" element={<ManagementPage/>} />
                        <Route path="destination/:slug" element={<DestinationDetails/>} />

    </Route>

    {/* <Route path="*" element={<PageNotfound/>} /> */}
    
    </>
    
))

export default router;