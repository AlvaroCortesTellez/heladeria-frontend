import React from "react";
import ProductoCard from "../components/productos/ProductoCard";

const productos = [
  { id: 1, nombre: "Producto A", descripcion: "Descripción A", precio: 100 },
  { id: 2, nombre: "Producto B", descripcion: "Descripción B", precio: 150 },
  { id: 3, nombre: "Producto C", descripcion: "Descripción C", precio: 200 },
];

const Home = () => {
  return (
    <div>
      <h1>Catálogo de productos</h1>
      <div className="productos-container">
        {productos.map((p) => (
          <ProductoCard key={p.id} producto={p} />
        ))}
      </div>
    </div>
  );
};

export default Home;
