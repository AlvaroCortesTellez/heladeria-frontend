import { supabase } from "../../lib/supabaseClient";

export default function SellProductModal({ producto, onClose }) {
  const handleSell = async () => {
    await supabase.rpc("vender_producto", { producto_id: producto.id });
    alert("Venta realizada!");
    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Vender {producto.nombre}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>¿Confirmas la venta de este producto?</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button className="btn btn-success" onClick={handleSell}>Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
