import { Navigate, Route, Routes, Outlet } from "react-router-dom";
// import MSLReferenceList from "../pages/mslReferenceList";
import ClaimantList from "../pages/claimantList";
import LoginPage from "../pages/auth/LoginPage"
import Register from "../pages/auth/Register";
import Verification from "../pages/auth/Verification";
// import { useEffect, useState } from 'react';
// import Header from '../components/Header';
import ForgotPwd from "../pages/auth/ForgotPwd";
import useAuthRouteCheck from "../hooks/useAuthRouteCheck";
import MainLayout from "../pages/MainLayout";

function PrivateRoute() {
    const token = localStorage.getItem("user");
    return token ? <Outlet /> : <Navigate replace to="/login" />;
}

function AppRoutes() {
    // const isAuthRoute = useAuthRouteCheck();
    // const showHeader = !isAuthRoute
    const isLoggedin = Object.keys(localStorage.getItem("user") || {}).length;
    console.log('isLoggedin:::', isLoggedin);
    return (
        <>
            {/* {showHeader && <Header />} */}
            <Routes>
                <Route element={<PrivateRoute />}>
                    {/* <Route element={<MSLReferenceList />} path="/msl-reference-list" /> */}
                    <Route element={<MainLayout />} path="/msl-reference-list" />
                    <Route element={<ClaimantList />} path="/claimant-list" />
                </Route>
                <Route element={<Navigate replace to={isLoggedin ? "/msl-reference-list" : "/login"} />} path="*" />
                <Route element={<LoginPage />} path="/login" />
                <Route element={<Register />} path="/register" />
                <Route element={<Verification />} path="/verification" />
                <Route element={<ForgotPwd />} path="/forgot-password" />
            </Routes>
        </>
    )
}

export default AppRoutes;