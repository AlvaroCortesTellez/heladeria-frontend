import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

function IngredientesList() {
  const [ingredientes, setIngredientes] = useState([]);

  const fetchIngredientes = async () => {
    const { data, error } = await supabase.from("ingredientes").select("*");
    if (error) console.log(error.message);
    else setIngredientes(data);
  };

  useEffect(() => {
    fetchIngredientes();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Lista de Ingredientes</h3>
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
          </tr>
        </thead>
        <tbody>
          {ingredientes.map((i) => (
            <tr key={i.id}>
              <td>{i.nombre}</td>
              <td>{i.precio}</td>
              <td>{i.calorias}</td>
              <td>{i.inventario}</td>
              <td>{i.es_vegetariano ? "Sí" : "No"}</td>
              <td>{i.es_sano ? "Sí" : "No"}</td>
              <td>{i.tipo}</td>
              <td>{i.sabor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IngredientesList;
