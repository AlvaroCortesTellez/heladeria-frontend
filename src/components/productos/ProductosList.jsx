import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import ProductoCard from "./ProductoCard";

export default function ProductosList() {
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    const { data, error } = await supabase.from("productos").select("*");
    if (error) {
      console.error("Error cargando productos:", error.message);
    } else {
      setProductos(data);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div>
      <h2>Productos</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {productos.map((prod) => (
          <ProductoCard key={prod.id} producto={prod} />
        ))}
      </div>
    </div>
  );
}
