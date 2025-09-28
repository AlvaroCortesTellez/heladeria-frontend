import React, { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import UserCreate from "./components/UserCreate";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState([]);

  // Cargar usuarios desde Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) console.error("Error cargando usuarios:", error.message);
      else setUsers(data);
    };
    fetchUsers();
  }, []);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <UserCreate onUserCreated={addUser} />
      <UserList users={users} />
    </div>
  );
}

export default App;
