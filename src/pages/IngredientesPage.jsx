import React, { useState } from "react";
import IngredientesForm from "../components/ingredientes/IngredienteForm";
import IngredientesList from "../components/ingredientes/IngredientesList";

function IngredientesPage() {
  return (
    <div className="container mt-4">
      <h2>Gestión de Ingredientes</h2>
      <IngredientesForm />
      <hr />
      <IngredientesList />
    </div>
  );
}

export default IngredientesPage;