import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function IngredienteForm({ onSave }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [calorias, setCalorias] = useState("");
  const [inventario, setInventario] = useState("");
  const [esVegetariano, setEsVegetariano] = useState(false);
  const [esSano, setEsSano] = useState(true);
  const [tipo, setTipo] = useState("base");
  const [sabor, setSabor] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("ingredientes").insert([{
      nombre,
      precio: parseFloat(precio),
      calorias: parseInt(calorias),
      inventario: parseInt(inventario),
      es_vegetariano: esVegetariano,
      es_sano: esSano,
      tipo,
      sabor: sabor || null
    }]);
    if (error) setError(error.message);
    else {
      setNombre(""); setPrecio(""); setCalorias(""); setInventario(""); setEsVegetariano(false); setEsSano(true); setTipo("base"); setSabor("");
      if(onSave) onSave();
    }
  };

  return (
    <div className="card p-3 mb-3">
      <h4>Agregar Ingrediente</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Nombre" value={nombre} onChange={e=>setNombre(e.target.value)} required />
        <input className="form-control mb-2" type="number" placeholder="Precio" value={precio} onChange={e=>setPrecio(e.target.value)} required />
        <input className="form-control mb-2" type="number" placeholder="Calorías" value={calorias} onChange={e=>setCalorias(e.target.value)} required />
        <input className="form-control mb-2" type="number" placeholder="Inventario" value={inventario} onChange={e=>setInventario(e.target.value)} required />
        <select className="form-select mb-2" value={tipo} onChange={e=>setTipo(e.target.value)}>
          <option value="base">Base</option>
          <option value="complemento">Complemento</option>
        </select>
        <input className="form-control mb-2" placeholder="Sabor (opcional)" value={sabor} onChange={e=>setSabor(e.target.value)} />
        <div className="form-check mb-2">
          <input className="form-check-input" type="checkbox" checked={esVegetariano} onChange={e=>setEsVegetariano(e.target.checked)} />
          <label className="form-check-label">Es vegetariano</label>
        </div>
        <div className="form-check mb-2">
          <input className="form-check-input" type="checkbox" checked={esSano} onChange={e=>setEsSano(e.target.checked)} />
          <label className="form-check-label">Es sano</label>
        </div>
        <button className="btn btn-success w-100">Guardar</button>
      </form>
    </div>
  );
}
