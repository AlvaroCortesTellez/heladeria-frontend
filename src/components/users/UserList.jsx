import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("Error fetching users:", error.message);
    } else {
      setUsers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h3 className="text-center mb-3">Listado de Usuarios</h3>
      {loading ? (
        <div className="text-center">Cargando...</div>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Rol</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.rol}</td>
                <td>{u.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
