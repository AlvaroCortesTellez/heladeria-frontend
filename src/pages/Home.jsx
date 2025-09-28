import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";
import ProductoCard from "../components/productos/ProductoCard.jsx";

const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .order("id", { ascending: true });

    if (error) console.error(error);
    else setProductos(data);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Productos disponibles</h2>
      <div className="row">
        {productos.map((prod) => (
          <div className="col-md-4 mb-3" key={prod.id}>
            <ProductoCard producto={prod} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
