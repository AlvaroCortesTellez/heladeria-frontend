import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ProductoCard from "./ProductoCard";

export default function ProductosList() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase
        .from("v_rentabilidad_producto")
        .select(`
          producto_id,
          nombre,
          precio_publico,
          costo,
          rentabilidad,
          total_calorias
        `);
      if (error) console.error(error);
      else setProductos(data);
    };
    fetchProductos();
  }, []);

  return (
    <div className="productos-grid">
      {productos.map((p) => (
        <ProductoCard key={p.producto_id} producto={p} />
      ))}
    </div>
  );
}
