import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function UserCreate({ onUserCreated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("cliente");
  const [error, setError] = useState("");

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const { data, error: authError } = await supabase.auth.signUp({ email, password });
      if (authError) throw authError;

      const { error: tableError } = await supabase.from("users").insert([{ id: data.user.id, nombre, rol }]);
      if (tableError) throw tableError;

      setEmail(""); setPassword(""); setNombre(""); setRol("cliente");
      if (onUserCreated) onUserCreated();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card p-4 mb-4">
      <h3>Crear Usuario</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleCreateUser}>
        <input type="text" placeholder="Nombre" className="form-control mb-2" value={nombre} onChange={e=>setNombre(e.target.value)} required />
        <input type="email" placeholder="Email" className="form-control mb-2" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" className="form-control mb-2" value={password} onChange={e=>setPassword(e.target.value)} required />
        <select className="form-select mb-2" value={rol} onChange={e=>setRol(e.target.value)}>
          <option value="cliente">Cliente</option>
          <option value="empleado">Empleado</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="btn btn-primary w-100">Crear Usuario</button>
      </form>
    </div>
  );
}
