import React, { useState } from "react";
import UserCreate from "../components/users/UserCreate";
import UserList from "../components/users/UserList";
import IngredientesPage from "./IngredientesPage";
import ProductosPage from "./ProductosPage";
import LoginPages from "./LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Home() {
  const [page, setPage] = useState("home");

  const renderContent = () => {
    switch (page) {
      case "ingredientes":
        return <IngredientesPage />;
      case "productos":
        return <ProductosPage />;
      case "createUser":
        return <UserCreate />;
      case "login":
        return <LoginPages />;
      case "userList":
        return <UserList />;
      default:
        return (
          <div className="text-center mt-5">
            <h1>Bienvenido a la Heladería</h1>
            <p>Selecciona una opción del menú para comenzar</p>
          </div>
        );
    }
  };

  return (
    <div className="container mt-4">
      {/* Menú de navegación */}
      <div className="d-flex justify-content-center mb-4 flex-wrap">
        <button className="btn btn-primary mx-2 my-1" onClick={() => setPage("ingredientes")}>
          Ingredientes
        </button>
        <button className="btn btn-success mx-2 my-1" onClick={() => setPage("productos")}>
          Productos
        </button>
        <button className="btn btn-warning mx-2 my-1" onClick={() => setPage("createUser")}>
          Crear Usuario
        </button>
        <button className="btn btn-info mx-2 my-1" onClick={() => setPage("login")}>
          Ingresar Usuario
        </button>
        <button className="btn btn-secondary mx-2 my-1" onClick={() => setPage("userList")}>
          Listado de Usuarios
        </button>
        <button className="btn btn-dark mx-2 my-1" onClick={() => setPage("home")}>
          Inicio
        </button>
      </div>

      {/* Contenido según sección */}
      <div className="border p-4 rounded shadow-sm bg-light">
        {renderContent()}
      </div>
    </div>
  );
}
