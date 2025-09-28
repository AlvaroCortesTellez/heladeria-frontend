import IngredientesList from "../components/ingredientes/IngredientesList";

export default function IngredientesPage() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Gestión de Ingredientes</h1>
      <IngredientesList />
    </div>
  );
}
