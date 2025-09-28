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
    </form>
  );
}
