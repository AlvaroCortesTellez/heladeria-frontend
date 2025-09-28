import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

function UserCreate({ onUserCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("users")
      .insert([formData])
      .select(); // devuelve el usuario creado

    if (error) {
      console.error("Error creando usuario:", error.message);
    } else {
      onUserCreated(data[0]); // actualiza la lista en la App
      setFormData({ name: "", email: "", age: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Crear Usuario</h3>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Correo"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Edad"
        value={formData.age}
        onChange={handleChange}
        required
      />
      <button type="submit">Crear</button>
    </form>
  );
}

export default UserCreate;
