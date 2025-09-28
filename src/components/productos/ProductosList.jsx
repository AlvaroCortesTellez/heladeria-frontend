import React, { useEffect, useState, useContext } from "react";
import { supabase } from "../../lib/supabaseClient";
import ProductoCard from "./ProductoCard";
import { AuthContext } from "../auth/AuthProvider";

const ProductosList = () => {
  const { userRole } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
<<<<<<< HEAD
=======
  const [loading, setLoading] = useState(true);
>>>>>>> f3601b207ea0add1c759beb397192741f5012458

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
    <div className="productos-grid">
      {productos.map((p) => (
        <ProductoCard key={p.producto_id} producto={p} />
      ))}
    </div>
  );
};

export default ProductosList;
