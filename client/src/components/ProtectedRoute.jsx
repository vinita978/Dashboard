import { Navigate } from "react-router-dom";
import React from "react"

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user?.auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
