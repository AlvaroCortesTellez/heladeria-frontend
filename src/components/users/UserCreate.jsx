// src/components/users/UserCreate.jsx
import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function UserCreate() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("cliente");
  const [message, setMessage] = useState("");

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // Crear usuario en auth.users
      const { data: userData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      });

      if (authError) throw authError;

      // Insertar info adicional en public.users
      const { error: dbError } = await supabase
        .from("users")
        .insert([{ id: userData.user.id, nombre, rol, created_at: new Date() }]);

      if (dbError) throw dbError;

      setMessage(`Usuario ${email} creado con éxito!`);
      setNombre("");
      setEmail("");
      setPassword("");
      setRol("cliente");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="card p-4">
      <h5>Crear Usuario</h5>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleCreateUser}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rol</label>
          <select className="form-select" value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="cliente">Cliente</option>
            <option value="empleado">Empleado</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">
          Crear
        </button>
      </form>
    </div>
  );
}
