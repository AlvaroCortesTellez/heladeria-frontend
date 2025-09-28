import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMensaje(error.message);
    } else {
      setMensaje(`Bienvenido ${data.user.user_metadata.nombre}`);
      onLogin(data.user);
    }
  };

  return (
    <div className="card p-3 my-3">
      <h5>Iniciar Sesión</h5>
      <form onSubmit={handleLogin}>
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
        <button type="submit" className="btn btn-success">
          Ingresar
        </button>
      </form>
      {mensaje && <div className="mt-2 alert alert-info">{mensaje}</div>}
    </div>
  );
}

export default LoginPage;
