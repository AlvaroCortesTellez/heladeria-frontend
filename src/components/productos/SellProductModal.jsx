import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

function SellProductModal({ producto, onClose }) {
  const [cantidad, setCantidad] = useState(1);
  const [message, setMessage] = useState("");

  const handleSell = async () => {
    if (cantidad <= 0) return;

    const total = producto.precio_publico * cantidad;

    const { error } = await supabase.from("ventas").insert([
      {
        producto_id: producto.id,
        cantidad,
        total,
      },
    ]);

    if (error) setMessage(error.message);
    else {
      setMessage("Venta registrada con éxito!");
      setCantidad(1);
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5 className="modal-title">{producto.nombre}</h5>
          {message && <div className="alert alert-info">{message}</div>}
          <div className="mb-3">
            <label className="form-label">Cantidad</label>
            <input
              type="number"
              className="form-control"
              value={cantidad}
              onChange={(e) => setCantidad(parseInt(e.target.value))}
              min={1}
            />
          </div>
          <button className="btn btn-success me-2" onClick={handleSell}>
            Confirmar Venta
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellProductModal;
