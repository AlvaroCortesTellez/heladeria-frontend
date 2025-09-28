import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

function UserCreate() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("cliente");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Crear usuario en Auth de Supabase
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        user_metadata: { nombre, rol },
        email_confirm: true,
      });
      if (error) throw error;

      setMensaje(`Usuario ${nombre} creado con éxito.`);
      setNombre("");
      setEmail("");
      setPassword("");
      setRol("cliente");
    } catch (err) {
      setMensaje(err.message);
    }
  };

  return (
    <div className="card p-3 my-3">
      <h5>Crear Usuario</h5>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-2"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          className="form-control my-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control my-2"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          className="form-control my-2"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
        >
          <option value="cliente">Cliente</option>
          <option value="empleado">Empleado</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Crear Usuario
        </button>
      </form>
      {mensaje && <div className="mt-2 alert alert-info">{mensaje}</div>}
    </div>
  );
}

export default UserCreate;
