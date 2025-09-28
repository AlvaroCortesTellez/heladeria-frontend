// src/pages/ProductosPage.jsx
import React, { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";
import ProductoCard from "../components/productos/ProductoCard";

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase
        .from("productos")
        .select(`
          *,
          producto_ingrediente(
            ingredientes(*)
          )
        `);
      if (error) console.error(error);
      else setProductos(data);
    };
    fetchProductos();
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {productos.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default ProductosPage;
