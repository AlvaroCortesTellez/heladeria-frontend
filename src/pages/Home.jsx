import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">🍦 Heladería App</h1>
      <p className="lead">
        Bienvenido al sistema de gestión de la heladería.  
        Selecciona una opción para continuar.
      </p>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link to="/ingredientes" className="btn btn-primary btn-lg">
          Ingredientes
        </Link>
        <Link to="/productos" className="btn btn-success btn-lg">
          Productos
        </Link>
      </div>
    </div>
  );
}
