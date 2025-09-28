import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ProductoCard from "./ProductoCard";

export default function ProductosList() {
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    const { data } = await supabase.from("productos").select("*");
    setProductos(data);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="row">
      {productos.map((p) => (
        <div className="col-md-4 mb-3" key={p.id}>
          <ProductoCard producto={p} />
        </div>
      ))}
    </div>
  );
}
