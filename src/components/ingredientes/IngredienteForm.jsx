<<<<<<< HEAD
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function IngredienteForm({ refresh }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);
  const [calorias, setCalorias] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await supabase.from('ingredientes').insert([{ nombre, precio, calorias, inventario: 10, tipo: 'base' }]);
      setNombre(''); setPrecio(0); setCalorias(0);
      refresh();
    } catch (err) { console.error(err.message); }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="mb-2">
        <input className="form-control" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      </div>
      <div className="mb-2">
        <input className="form-control" type="number" placeholder="Precio" value={precio} onChange={e => setPrecio(Number(e.target.value))} />
      </div>
      <div className="mb-2">
        <input className="form-control" type="number" placeholder="Calorías" value={calorias} onChange={e => setCalorias(Number(e.target.value))} />
      </div>
      <button className="btn btn-primary">Agregar Ingrediente</button>
=======
import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const IngredienteForm = ({ refresh }) => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [calorias, setCalorias] = useState(0);
  const [inventario, setInventario] = useState(0);
  const [tipo, setTipo] = useState("base");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from("ingredientes").insert([{ nombre, precio, calorias, inventario, tipo }]);
    setNombre(""); setPrecio(0); setCalorias(0); setInventario(0); setTipo("base");
    refresh();
  };

  return (
    <form className="mb-3" onSubmit={handleSubmit}>
      <div className="row g-2">
        <div className="col">
          <input type="text" className="form-control" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div className="col">
          <input type="number" className="form-control" placeholder="Precio" value={precio} onChange={(e) => setPrecio(Number(e.target.value))} required />
        </div>
        <div className="col">
          <input type="number" className="form-control" placeholder="Calorías" value={calorias} onChange={(e) => setCalorias(Number(e.target.value))} required />
        </div>
        <div className="col">
          <input type="number" className="form-control" placeholder="Inventario" value={inventario} onChange={(e) => setInventario(Number(e.target.value))} required />
        </div>
        <div className="col">
          <select className="form-control" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="base">Base</option>
            <option value="complemento">Complemento</option>
          </select>
        </div>
        <div className="col">
          <button className="btn btn-primary w-100" type="submit">Agregar</button>
        </div>
      </div>
>>>>>>> f3601b207ea0add1c759beb397192741f5012458
    </form>
  );
};

export default IngredienteForm;
