import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function SellProductModal({ producto, onVenta }) {
  const [cantidad, setCantidad] = useState(1);

  const handleSell = async () => {
    try {
      const total = producto.precio_publico * cantidad;
      const { data, error } = await supabase.from("ventas").insert([
        {
          producto_id: producto.id,
          user_id: null, // o puedes pasar el ID del usuario logueado
          cantidad,
          total,
        },
      ]);
      if (error) throw error;
      onVenta && onVenta(data[0]);
    } catch (err) {
      console.error("Error registrando venta:", err.message);
    }
  };

  return (
    <div style={{ border: "1px solid black", padding: "8px" }}>
      <h3>Vender: {producto.nombre}</h3>
      <input type="number" min={1} value={cantidad} onChange={(e) => setCantidad(parseInt(e.target.value))} />
      <button onClick={handleSell}>Vender</button>
    </div>
  );
}
