import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
    const { authToken } = useSelector((state) => state.auth);

    return authToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
