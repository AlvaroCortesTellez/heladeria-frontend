// src/components/common/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/productos">Productos</Link> |{" "}
      <Link to="/ingredientes">Ingredientes</Link> |{" "}
      {user ? (
        <>
          <span>Hola, {user.email}</span>{" "}
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
