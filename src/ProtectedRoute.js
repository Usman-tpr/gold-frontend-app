import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('Gold_token');

  // useEffect(() => {
  //   if (!token) {
  //     console.log("Token missing, redirecting...");
  //     navigate("/user-onboarding", { replace: true });
  //   }
  // }, [token, navigate]);

  if (!token) {
    return <Navigate to="/user-onboarding" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
