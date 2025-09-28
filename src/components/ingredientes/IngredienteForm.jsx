import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

function IngredientesForm() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [calorias, setCalorias] = useState(0);
  const [inventario, setInventario] = useState(0);
  const [esVegetariano, setEsVegetariano] = useState(false);
  const [esSano, setEsSano] = useState(true);
  const [tipo, setTipo] = useState("base");
  const [sabor, setSabor] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.from("ingredientes").insert([
      {
        nombre,
        precio,
        calorias,
        inventario,
        es_vegetariano: esVegetariano,
        es_sano: esSano,
        tipo,
        sabor,
      },
    ]);

    if (error) setMessage(error.message);
    else {
      setMessage("Ingrediente creado!");
      setNombre("");
      setPrecio(0);
      setCalorias(0);
      setInventario(0);
      setEsVegetariano(false);
      setEsSano(true);
      setTipo("base");
      setSabor("");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Agregar Ingrediente</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            value={precio}
            onChange={(e) => setPrecio(parseFloat(e.target.value))}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Calorías</label>
          <input
            type="number"
            className="form-control"
            value={calorias}
            onChange={(e) => setCalorias(parseInt(e.target.value))}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Inventario</label>
          <input
            type="number"
            className="form-control"
            value={inventario}
            onChange={(e) => setInventario(parseInt(e.target.value))}
          />
        </div>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={esVegetariano}
            onChange={(e) => setEsVegetariano(e.target.checked)}
          />
          <label className="form-check-label">Es Vegetariano</label>
        </div>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={esSano}
            onChange={(e) => setEsSano(e.target.checked)}
          />
          <label className="form-check-label">Es Sano</label>
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <select
            className="form-select"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="base">Base</option>
            <option value="complemento">Complemento</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Sabor</label>
          <input
            className="form-control"
            value={sabor}
            onChange={(e) => setSabor(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Guardar Ingrediente
        </button>
      </form>
    </div>
  );
}

export default IngredientesForm;
