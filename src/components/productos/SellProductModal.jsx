import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient.js";

const SellProductModal = ({ producto, onClose, onSold }) => {
  const [cantidad, setCantidad] = useState(1);
  const handleSell = async () => {
    // Crear venta
    const { error: errVenta } = await supabase.from("ventas").insert([{
      producto_id: producto.id,
      cantidad,
      total: producto.precio_publico * cantidad
    }]);
    if (errVenta) { alert(errVenta.message); return; }

    // Reducir inventario de los ingredientes
    const { data: ingredientes } = await supabase
      .from("producto_ingrediente")
      .select("ingrediente_id")
      .eq("producto_id", producto.id);

    for (const ing of ingredientes) {
      const { data: ingrData } = await supabase.from("ingredientes").select("inventario, tipo").eq("id", ing.ingrediente_id).single();
      let newInv = ingrData.inventario - cantidad;
      if (ingrData.tipo === "complemento") newInv = 0; // complementos a 0
      await supabase.from("ingredientes").update({ inventario: newInv }).eq("id", ing.ingrediente_id);
    }

    onSold();
    onClose();
  };

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Vender {producto.nombre}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input type="number" className="form-control" min="1" value={cantidad} onChange={e => setCantidad(Number(e.target.value))} />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button className="btn btn-primary" onClick={handleSell}>Vender</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellProductModal;
