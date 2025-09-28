import React from "react";

export default function UserList({ users }) {
  if (!users || users.length === 0) {
    return <p>No hay usuarios registrados.</p>;
  }

  return (
    <div className="container mt-4">
      <h3>Lista de Usuarios</h3>
      <table className="table table-striped table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nombre || user.name}</td>
              <td>{user.email || "No disponible"}</td>
              <td>{user.rol || "cliente"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
