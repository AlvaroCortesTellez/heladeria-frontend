import React from 'react';
import IngredientesList from '../components/ingredientes/IngredientesList';

export default function IngredientesPage() {
  return (
    <div className="container mt-4">
      <h2>Ingredientes</h2>
      <IngredientesList />
    </div>
  );
}
