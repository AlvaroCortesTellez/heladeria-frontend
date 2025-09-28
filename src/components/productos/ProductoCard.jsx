import React from "react";

export default function ProductoCard({ producto }) {
  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p>Precio: {producto.precio_publico}</p>
        <p>Tipo: {producto.tipo}</p>
      </div>
    </div>
  );
}
