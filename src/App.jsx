import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, AuthContext } from "./components/auth/AuthProvider";
import Home from "./pages/Home";
import ProductosPage from "./pages/ProductosPage";
import IngredientesPage from "./pages/IngredientesPage";
import Login from "./components/auth/Login";

const AppContent = () => {
  const { user, userRole, logout } = useContext(AuthContext);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Heladería</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
              {user && (userRole === "admin" || userRole === "empleado") && (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/ingredientes">Ingredientes</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
                </>
              )}
            </ul>
            <ul className="navbar-nav ms-auto">
              {user ? (
                <li className="nav-item"><button className="btn btn-outline-secondary" onClick={logout}>Salir</button></li>
              ) : (
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/ingredientes" element={<IngredientesPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
