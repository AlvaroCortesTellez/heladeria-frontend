import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role } = useContext(AuthContext);
  if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
