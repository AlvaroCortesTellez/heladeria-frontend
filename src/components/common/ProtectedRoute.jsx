import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider.jsx";

/**
 * ProtectedRoute bloquea rutas según:
 * - usuario no autenticado → redirige a /login
 * - roles (opcional)
 *
 * children: elementos protegidos
 * roles: array con roles permitidos ["admin", "empleado"]
 */
const ProtectedRoute = ({ roles }) => {
  const { user, role } = useAuth();

  // Si no está logueado, va al login
  if (!user) return <Navigate to="/login" replace />;

  // Si se definieron roles y el usuario no está en ellos
  if (roles && !roles.includes(role)) return <Navigate to="/" replace />;

  // Si pasa los filtros, renderiza la ruta
  return <Outlet />;
};

export default ProtectedRoute;
