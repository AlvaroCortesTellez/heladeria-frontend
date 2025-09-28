import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ProductoCard from "./ProductoCard";
import SellProductModal from "./SellProductModal";

function ProductosList() {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProductos = async () => {
    const { data, error } = await supabase.from("productos").select("*");
    if (error) console.log(error.message);
    else setProductos(data);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Productos</h3>
      <div className="d-flex flex-wrap">
        {productos.map((p) => (
          <ProductoCard key={p.id} producto={p} onSell={setSelectedProduct} />
        ))}
      </div>

      {selectedProduct && (
        <SellProductModal
          producto={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default ProductosList;
