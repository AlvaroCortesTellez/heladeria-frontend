import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function IngredientesList() {
  const [ingredientes, setIngredientes] = useState([]);

  const fetchIngredientes = async () => {
    const { data, error } = await supabase.from("ingredientes").select("*");
    if (error) {
      console.error("Error cargando ingredientes:", error.message);
    } else {
      setIngredientes(data);
    }
  };

  useEffect(() => {
    fetchIngredientes();
  }, []);

  return (
    <div>
      <h2>Lista de Ingredientes</h2>
      <ul>
        {ingredientes.map((ing) => (
          <li key={ing.id}>
            {ing.nombre} - Precio: {ing.precio} - Calorías: {ing.calorias} - Tipo: {ing.tipo}
          </li>
        ))}
      </ul>
    </div>
  );
}
