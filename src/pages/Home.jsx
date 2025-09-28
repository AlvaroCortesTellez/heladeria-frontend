import React from "react";
<<<<<<< HEAD
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
=======
import ProductosList from "../components/productos/ProductosList";

const Home = () => {
  return (
    <div className="container mt-4">
      <h1>Bienvenido a la Heladería</h1>
      <ProductosList />
>>>>>>> f3601b207ea0add1c759beb397192741f5012458
    </div>
  );
};

export default Home;
