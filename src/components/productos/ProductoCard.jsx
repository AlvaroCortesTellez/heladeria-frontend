// src/components/productos/ProductoCard.jsx
import React from "react";

const ProductoCard = ({ producto }) => {
  const ingredientes = producto.producto_ingrediente.map((pi) => pi.ingredientes.nombre).join(", ");
  
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", width: "250px" }}>
      <h3>{producto.nombre}</h3>
      <p>Ingredientes: {ingredientes}</p>
      <p>Precio público: ${producto.precio_publico}</p>
      {/* Aquí podrías añadir calorías, costo y rentabilidad desde las vistas de supabase */}
    </div>
  );
};

export default ProductoCard;
