import React, { useState } from "react";
import SellProductModal from "./SellProductModal";

export default function ProductoCard({ producto }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="producto-card">
      <h3>{producto.nombre}</h3>
      <p>Precio: ${producto.precio_publico}</p>
      <p>Costo: ${producto.costo}</p>
      <p>Rentabilidad: ${producto.rentabilidad}</p>
      <p>Calorías: {producto.total_calorias}</p>
      <button onClick={() => setShowModal(true)}>Vender</button>
      {showModal && (
        <SellProductModal
          producto={producto}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
