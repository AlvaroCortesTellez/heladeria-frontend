import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) setError(error.message);
      else setUsers(data);
    };
    fetchUsers();
  }, []);

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h3>Usuarios</h3>
      <table className="table">
        <thead>
          <tr><th>Nombre</th><th>Rol</th><th>ID</th></tr>
        </thead>
        <tbody>
          {users.map(u => <tr key={u.id}><td>{u.nombre}</td><td>{u.rol}</td><td>{u.id}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}
