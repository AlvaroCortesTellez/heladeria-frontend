import React, { useState } from "react";
import IngredienteForm from "../components/ingredientes/IngredienteForm";
import IngredientesList from "../components/ingredientes/IngredientesList";

export default function IngredientesPage() {
  const [refresh, setRefresh] = useState(false);
  return (
    <div className="container mt-4">
      <h2>Gestión de Ingredientes</h2>
      <IngredienteForm onSave={()=>setRefresh(!refresh)} />
      <IngredientesList key={refresh} />
    </div>
  );
}
