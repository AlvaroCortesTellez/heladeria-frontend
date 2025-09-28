// src/components/users/UserList.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        setError(error.message);
      } else {
        setUsers(data);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h5>Lista de Usuarios</h5>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Creado</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.rol}</td>
              <td>{new Date(u.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
