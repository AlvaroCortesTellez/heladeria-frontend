import { useState } from "react";
import SellProductModal from "./SellProductModal";

export default function ProductoCard({ producto }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">
          Precio: ${producto.precio_publico} <br />
          Tipo: {producto.tipo}
        </p>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Vender
        </button>
        {showModal && (
          <SellProductModal producto={producto} onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
}
