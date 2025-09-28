import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";
import ProductoCard from "../components/productos/ProductoCard.jsx";
import SellProductModal from "../components/productos/SellProductModal.jsx";

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchProductos = async () => {
    const { data, error } = await supabase.from("productos").select("*").order("id");
    if (error) console.error(error);
    else setProductos(data);
  };

  useEffect(() => { fetchProductos(); }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Productos</h2>
      <div className="row">
        {productos.map(prod => (
          <div className="col-md-4 mb-3" key={prod.id}>
            <ProductoCard producto={prod} />
            <button className="btn btn-success mt-2 w-100" onClick={() => setSelected(prod)}>Vender</button>
          </div>
        ))}
      </div>
      {selected && <SellProductModal producto={selected} onClose={() => setSelected(null)} onSold={fetchProductos} />}
    </div>
  );
};

export default ProductosPage;
