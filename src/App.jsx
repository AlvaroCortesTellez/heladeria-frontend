import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import Navbar from "./components/common/Nabvar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import ProductosPage from "./pages/ProductosPage";
import IngredientesPage from "./pages/IngredientesPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/ingredientes" element={<IngredientesPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
