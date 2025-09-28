import React, { useState } from "react";
import ProductosPage from "./ProductosPage";
import IngredientesPage from "./IngredientesPage";
import LoginPage from "./LoginPage";
import UserCreate from "../components/users/UserCreate";
import UserList from "../components/users/UserList";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Heladería</h1>
      <div className="mb-3 text-center">
        <button className="btn btn-outline-primary mx-1" onClick={() => setPage("login")}>Login</button>
        <button className="btn btn-outline-secondary mx-1" onClick={() => setPage("createUser")}>Crear Usuario</button>
        <button className="btn btn-outline-info mx-1" onClick={() => setPage("userList")}>Usuarios</button>
        <button className="btn btn-outline-success mx-1" onClick={() => setPage("ingredientes")}>Ingredientes</button>
        <button className="btn btn-outline-warning mx-1" onClick={() => setPage("productos")}>Productos</button>
      </div>

      {page === "login" && <LoginPage onLogin={setUser} />}
      {page === "createUser" && <UserCreate />}
      {page === "userList" && <UserList />}
      {page === "ingredientes" && <IngredientesPage />}
      {page === "productos" && <ProductosPage />}
    </div>
  );
}

export default Home;
