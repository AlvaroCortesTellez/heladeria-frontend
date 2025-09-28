import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      setError(error.message);
    } else {
      setUsers(data);
    }
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.age} años
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
