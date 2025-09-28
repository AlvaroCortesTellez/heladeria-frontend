import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient.js";
import IngredienteForm from "./IngredienteForm.jsx";

const IngredientesList = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchIngredientes = async () => {
    const { data, error } = await supabase.from("ingredientes").select("*").order("id");
    if (error) console.error(error);
    else setIngredientes(data);
  };

  useEffect(() => { fetchIngredientes(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar ingrediente?")) return;
    const { error } = await supabase.from("ingredientes").delete().eq("id", id);
    if (error) alert(error.message);
    else fetchIngredientes();
  };

  return (
    <div className="container mt-4">
      <h2>Ingredientes</h2>
      <IngredienteForm ingrediente={editing} onSave={() => { setEditing(null); fetchIngredientes(); }} />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Calorías</th>
            <th>Inventario</th>
            <th>Vegetariano</th>
            <th>Sano</th>
            <th>Tipo</th>
            <th>Sabor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingredientes.map(i => (
            <tr key={i.id}>
              <td>{i.nombre}</td>
              <td>{i.precio}</td>
              <td>{i.calorias}</td>
              <td>{i.inventario}</td>
              <td>{i.es_vegetariano ? "Sí" : "No"}</td>
              <td>{i.es_sano ? "Sí" : "No"}</td>
              <td>{i.tipo}</td>
              <td>{i.sabor || "-"}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => setEditing(i)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(i.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IngredientesList;
