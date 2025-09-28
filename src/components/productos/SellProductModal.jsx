import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function SellProductModal({ producto, onClose }) {
  const [cantidad, setCantidad] = useState(1);

  const handleSell = async () => {
    // Registrar venta
    const total = producto.precio_publico * cantidad;
    const { error: ventaError } = await supabase.from("ventas").insert({
      producto_id: producto.producto_id,
      cantidad,
      total,
    });

    if (ventaError) return alert("Error al registrar venta: " + ventaError.message);

    // Aquí podrías actualizar inventario de ingredientes
    alert("Venta registrada!");
    onClose();
  };

  return (
    <div className="modal">
      <h3>Vender {producto.nombre}</h3>
      <input
        type="number"
        min="1"
        value={cantidad}
        onChange={(e) => setCantidad(parseInt(e.target.value))}
      />
      <button onClick={handleSell}>Confirmar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
}
