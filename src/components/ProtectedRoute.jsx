import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  // Get authentication status from Redux store
  const isAuth = useSelector((state) => state.auth.isAuth);

  // If not authenticated, redirect to login page
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
