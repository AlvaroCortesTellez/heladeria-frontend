import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ProductoCard from "./ProductoCard";

export default function ProductosList() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  const fetchProductos = async () => {
    const { data, error } = await supabase.from("productos").select("*");
    if(error) setError(error.message);
    else setProductos(data);
  };

  useEffect(()=>{ fetchProductos(); }, []);

  if(error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="d-flex flex-wrap">
      {productos.map(p => <ProductoCard key={p.id} producto={p} />)}
    </div>
  );
}
