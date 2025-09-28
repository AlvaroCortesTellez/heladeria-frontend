import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import IngredientesPage from "./pages/IngredientesPage.jsx";
import ProductosPage from "./pages/ProductosPage.jsx";
import Login from "./components/auth/Login.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import Navbar from "./components/common/Nabvar.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Público */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Solo usuarios autenticados */}
        <Route element={<ProtectedRoute roles={["admin", "empleado"]} />}>
          <Route path="/ingredientes" element={<IngredientesPage />} />
          <Route path="/productos" element={<ProductosPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
