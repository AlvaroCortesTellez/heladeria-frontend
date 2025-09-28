import React from "react";

const ProductoCard = ({ producto }) => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">Precio público: ${producto.precio_publico}</p>
        <p className="card-text">Tipo: {producto.tipo}</p>
        {producto.tipo === "copa" && <p className="card-text">Vaso: {producto.vaso}</p>}
        {producto.tipo === "malteada" && <p className="card-text">Volumen: {producto.volumen_onzas} oz</p>}
      </div>
    </div>
  );
};

export default ProductoCard;
