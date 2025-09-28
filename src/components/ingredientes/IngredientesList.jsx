import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import IngredienteForm from "./IngredienteForm";

export default function IngredientesList() {
  const [ingredientes, setIngredientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIngredientes = async () => {
    const { data, error } = await supabase.from("ingredientes").select("*");
    if (!error) setIngredientes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchIngredientes();
  }, []);

  return (
    <div>
      <h2>Lista de Ingredientes</h2>
      <IngredienteForm onSaved={fetchIngredientes} />
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="table table-striped mt-3">
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
            {ingredientes.map((ing) => (
              <tr key={ing.id}>
                <td>{ing.nombre}</td>
                <td>{ing.precio}</td>
                <td>{ing.calorias}</td>
                <td>{ing.inventario}</td>
                <td>{ing.es_vegetariano ? "Sí" : "No"}</td>
                <td>{ing.es_sano ? "Sí" : "No"}</td>
                <td>{ing.tipo}</td>
                <td>{ing.sabor ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
