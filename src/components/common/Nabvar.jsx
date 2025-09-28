import React from "react";
import { useAuth } from "../auth/AuthProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  return (
    <nav>
      <Link to="/">Inicio</Link>
      {user ? (
        <>
          <span>Hola, {user.email}</span>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <Link to="/login">Iniciar sesión</Link>
      )}
    </nav>
  );
};

export default Navbar;
