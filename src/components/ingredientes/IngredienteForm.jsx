import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function IngredientesForm({ onIngredienteCreated }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [calorias, setCalorias] = useState("");
  const [inventario, setInventario] = useState(0);
  const [esVegetariano, setEsVegetariano] = useState(true);
  const [esSano, setEsSano] = useState(true);
  const [tipo, setTipo] = useState("base");
  const [sabor, setSabor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("ingredientes")
        .insert([
          {
            nombre,
            precio: parseFloat(precio),
            calorias: parseInt(calorias),
            inventario: parseInt(inventario),
            es_vegetariano: esVegetariano,
            es_sano: esSano,
            tipo,
            sabor: sabor || null,
          },
        ]);
      if (error) throw error;
      setNombre("");
      setPrecio("");
      setCalorias("");
      setInventario(0);
      setEsVegetariano(true);
      setEsSano(true);
      setTipo("base");
      setSabor("");
      onIngredienteCreated && onIngredienteCreated(data[0]);
    } catch (err) {
      console.error("Error creando ingrediente:", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      <input placeholder="Precio" type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
      <input placeholder="Calorías" type="number" value={calorias} onChange={(e) => setCalorias(e.target.value)} required />
      <input placeholder="Inventario" type="number" value={inventario} onChange={(e) => setInventario(e.target.value)} />
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="base">Base</option>
        <option value="complemento">Complemento</option>
      </select>
      <input placeholder="Sabor" value={sabor} onChange={(e) => setSabor(e.target.value)} />
      <label>
        Vegetariano:
        <input type="checkbox" checked={esVegetariano} onChange={(e) => setEsVegetariano(e.target.checked)} />
      </label>
      <label>
        Sano:
        <input type="checkbox" checked={esSano} onChange={(e) => setEsSano(e.target.checked)} />
      </label>
      <button type="submit">Agregar Ingrediente</button>
    </form>
  );
}
