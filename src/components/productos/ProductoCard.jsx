import React from "react";

function ProductoCard({ producto, onSell }) {
  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">
          Precio: ${producto.precio_publico} <br />
          Tipo: {producto.tipo} <br />
          Vaso: {producto.vaso || "-"} <br />
          Volumen: {producto.volumen_onzas || "-"} oz
        </p>
        <button className="btn btn-success" onClick={() => onSell(producto)}>
          Vender
        </button>
      </div>
    </div>
  );
}

export default ProductoCard;
