// src/components/productos/ProductoCard.jsx
import React, { useState } from "react";
import supabase from "../../lib/supabaseClient";

const ProductoCard = ({ producto }) => {
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");

  const ingredientes = producto.producto_ingrediente
    .map((pi) => pi.ingredientes.nombre)
    .join(", ");

  // Función para vender producto y actualizar inventario
  const venderProducto = async () => {
    try {
      // 1️⃣ Verificar inventario de cada ingrediente
      for (const pi of producto.producto_ingrediente) {
        if (pi.ingredientes.inventario < cantidad) {
          setMensaje(`No hay suficiente inventario de ${pi.ingredientes.nombre}`);
          return;
        }
      }

      // 2️⃣ Insertar venta
      const { error: ventaError } = await supabase.from("ventas").insert([
        {
          producto_id: producto.id,
          cantidad,
          total: producto.precio_publico * cantidad,
        },
      ]);

      if (ventaError) throw ventaError;

      // 3️⃣ Actualizar inventario de ingredientes
      for (const pi of producto.producto_ingrediente) {
        const { error: invError } = await supabase
          .from("ingredientes")
          .update({ inventario: pi.ingredientes.inventario - cantidad })
          .eq("id", pi.ingredientes.id);
        if (invError) throw invError;
      }

      setMensaje(`Venta de ${cantidad} ${producto.nombre} realizada con éxito!`);
    } catch (err) {
      setMensaje(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", width: "250px" }}>
      <h3>{producto.nombre}</h3>
      <p>Ingredientes: {ingredientes}</p>
      <p>Precio público: ${producto.precio_publico}</p>
      <p>Calorías: {/* se puede usar la vista v_calorias_producto si quieres */}</p>
      <p>Costo: {/* se puede usar la vista v_costo_producto */}</p>
      <p>Rentabilidad: {/* se puede usar la vista v_rentabilidad_producto */}</p>

      {/* Venta */}
      <input
        type="number"
        value={cantidad}
        min={1}
        onChange={(e) => setCantidad(Number(e.target.value))}
        style={{ width: "50px" }}
      />
      <button onClick={venderProducto} style={{ marginLeft: "5px" }}>
        Vender
      </button>

      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
    </div>
  );
};

export default ProductoCard;
