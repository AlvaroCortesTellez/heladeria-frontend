import React from "react";
import ProductosList from "../components/productos/ProductosList";

const ProductosPage = () => {
  return (
    <div className="container mt-4">
      <h2>Productos</h2>
      <ProductosList />
    </div>
  );
};

export default ProductosPage;
