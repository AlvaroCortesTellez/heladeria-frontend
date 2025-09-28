import React, { useEffect, useState, useContext } from "react";
import { supabase } from "../../lib/supabaseClient";
import ProductoCard from "./ProductoCard";
import { AuthContext } from "../auth/AuthProvider";

const ProductosList = () => {
  const { userRole } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("productos")
      .select(`
        *,
        v_calorias_producto(total_calorias),
        v_costo_producto(costo),
        v_rentabilidad_producto(rentabilidad)
      `);
    if (!error) setProductos(data);
    setLoading(false);
  };

  if (loading) return <p>Cargando productos...</p>;
  if (!productos.length) return <p>No hay productos disponibles.</p>;

  return (
    <div className="row">
      {productos.map((p) => (
        <div className="col-md-4 mb-3" key={p.id}>
          <ProductoCard producto={p} />
        </div>
      ))}
    </div>
  );
};

export default ProductosList;
