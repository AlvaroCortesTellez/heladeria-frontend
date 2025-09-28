import React from "react";
import ProductosList from "../components/productos/ProductosList";

const Home = () => {
  return (
    <div className="container mt-4">
      <h1>Bienvenido a la Heladería</h1>
      <ProductosList />
    </div>
  );
};

export default Home;
