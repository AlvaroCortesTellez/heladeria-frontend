import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider.jsx";
import { supabase } from "../../lib/supabaseClient.js";

const Navbar = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">🍦 Heladería</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Rol: {role}</span>
                </li>
                {(role === "admin" || role === "empleado") && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/productos">Productos</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/ingredientes">Ingredientes</Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-outline-primary" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
