import React, { useState } from "react";
import IngredientesPage from "./IngredientesPage";
import ProductosPage from "./ProductosPage";
import UserCreate from "../components/users/UserCreate";
import UserList from "../components/users/UserList";

export default function Home() {
  const [page, setPage] = useState("usuarios");

  return (
    <div className="container mt-4">
      <h1>Heladería - Panel de Administración</h1>
      <nav className="nav nav-pills mb-4">
        <button className="btn btn-outline-primary me-2" onClick={()=>setPage("usuarios")}>Usuarios</button>
        <button className="btn btn-outline-primary me-2" onClick={()=>setPage("ingredientes")}>Ingredientes</button>
        <button className="btn btn-outline-primary" onClick={()=>setPage("productos")}>Productos</button>
      </nav>

      {page==="usuarios" && (
        <>
          <UserCreate />
          <UserList />
        </>
      )}
      {page==="ingredientes" && <IngredientesPage />}
      {page==="productos" && <ProductosPage />}
    </div>
  );
}
