import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthToken } from "../storage/storage";



function PrivateRoute() {
    const tokenFromRedux = useSelector((state) => state.user?.token);
    const tokenFromStorage = getAuthToken();
    const token = tokenFromRedux || tokenFromStorage;
    if (!token) {
        return <Navigate to="/login" replace />;
    }
  return <Outlet />;
}

export default PrivateRoute
