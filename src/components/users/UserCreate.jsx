import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

function UserCreate({ onUserCreated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, age: parseInt(age) }])
      .select();

    if (error) {
      setError(error.message);
    } else {
      setName("");
      setEmail("");
      setAge("");
      if (onUserCreated) onUserCreated(data[0]);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Crear Usuario</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Edad</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
}

export default UserCreate;
