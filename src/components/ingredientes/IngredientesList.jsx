import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import IngredienteForm from "./IngredienteForm";

const IngredientesList = () => {
  const [ingredientes, setIngredientes] = useState([]);

  const fetchIngredientes = async () => {
    const { data } = await supabase.from("ingredientes").select("*");
    setIngredientes(data || []);
  };

  useEffect(() => {
    fetchIngredientes();
  }, []);

  return (
    <div>
      <IngredienteForm refresh={fetchIngredientes} />
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Calorías</th>
            <th>Inventario</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingredientes.map((i) => (
            <tr key={i.id}>
              <td>{i.nombre}</td>
              <td>{i.precio}</td>
              <td>{i.calorias}</td>
              <td>{i.inventario}</td>
              <td>{i.tipo}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={async () => {
                  await supabase.from("ingredientes").delete().eq("id", i.id);
                  fetchIngredientes();
                }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IngredientesList;
