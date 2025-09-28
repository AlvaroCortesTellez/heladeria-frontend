// src/components/productos/ProductosList.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ProductoCard from "./ProductoCard";

export default function ProductosList() {
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    const { data } = await supabase.from("productos").select("*");
    setProductos(data || []);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row g-3">
        {productos.map((p) => (
          <div key={p.id} className="col-md-4">
            <ProductoCard producto={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
