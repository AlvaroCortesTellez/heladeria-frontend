import React, { useState } from "react";
import IngredientesForm from "../ingredientes/IngredientesForm";
import IngredientesList from "../ingredientes/IngredientesList";

export default function IngredientesPage() {
  const [refresh, setRefresh] = useState(false);

  const handleIngredienteCreated = () => setRefresh(!refresh);

  return (
    <div>
      <h1>Gestión de Ingredientes</h1>
      <IngredientesForm onIngredienteCreated={handleIngredienteCreated} />
      <IngredientesList key={refresh} />
    </div>
  );
}
