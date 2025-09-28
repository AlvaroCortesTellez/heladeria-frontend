import React from "react";
import ProductosList from "../components/productos/ProductosList";

function ProductosPage() {
  return (
    <div className="container mt-4">
      <h2>Gestión de Productos</h2>
      <ProductosList />
    </div>
  );
}

export default ProductosPage;