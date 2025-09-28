import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

function UserList() {
  const [users, setUsers] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      setMensaje(error.message);
    } else {
      setUsers(data);
    }
  };

  return (
    <div className="card p-3 my-3">
      <h5>Lista de Usuarios</h5>
      {mensaje && <div className="alert alert-danger">{mensaje}</div>}
      <ul className="list-group">
        {users.map((u) => (
          <li key={u.id} className="list-group-item">
            {u.nombre} - {u.rol} - {u.email || "Sin email"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
