import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function LoginPages() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErrorMsg(error.message);
    } else {
      setErrorMsg("");
      alert(`Bienvenido ${data.user.email}`);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <form className="p-4 border rounded shadow-sm bg-white" style={{ minWidth: "350px" }} onSubmit={handleLogin}>
        <h3 className="text-center mb-4">Ingresar Usuario</h3>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Ingresar</button>
      </form>
    </div>
  );
}
