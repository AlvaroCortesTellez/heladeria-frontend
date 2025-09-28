import React from "react";

export default function ProductoCard({ producto }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "8px", margin: "4px" }}>
      <h3>{producto.nombre}</h3>
      <p>Precio: {producto.precio_publico}</p>
      <p>Tipo: {producto.tipo}</p>
      {producto.vaso && <p>Vaso: {producto.vaso}</p>}
      {producto.volumen_onzas && <p>Volumen: {producto.volumen_onzas} oz</p>}
    </div>
  );
}
