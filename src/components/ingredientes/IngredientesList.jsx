import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function IngredientesList() {
  const [ingredientes, setIngredientes] = useState([]);
  const [error, setError] = useState("");

  const fetchIngredientes = async () => {
    const { data, error } = await supabase.from("ingredientes").select("*");
    if (error) setError(error.message);
    else setIngredientes(data);
  };

  const handleDelete = async (id) => {
    await supabase.from("ingredientes").delete().eq("id", id);
    fetchIngredientes();
  };

  useEffect(() => { fetchIngredientes(); }, []);

  if(error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h4>Lista de Ingredientes</h4>
      <table className="table table-striped">
        <thead>
          <tr><th>Nombre</th><th>Precio</th><th>Calorías</th><th>Inventario</th><th>Tipo</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {ingredientes.map(i=>(
            <tr key={i.id}>
              <td>{i.nombre}</td>
              <td>{i.precio}</td>
              <td>{i.calorias}</td>
              <td>{i.inventario}</td>
              <td>{i.tipo}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(i.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
