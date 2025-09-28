import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function UserCreate() {
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("cliente");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await supabase.auth.admin.createUser({
        email: `${nombre}@example.com`,
        password: "Password123!", // Contraseña temporal
        email_confirm: true,
      });

      if (userResponse.error) {
        setErrorMsg(userResponse.error.message);
        return;
      }

      const { data, error } = await supabase.from("users").insert([
        {
          id: userResponse.data.user.id,
          nombre,
          rol,
        },
      ]);

      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg("Usuario creado exitosamente!");
        setErrorMsg("");
        setNombre("");
        setRol("cliente");
      }
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <form className="p-4 border rounded shadow-sm bg-white" style={{ minWidth: "350px" }} onSubmit={handleSubmit}>
        <h3 className="text-center mb-4">Crear Usuario</h3>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        {successMsg && <div className="alert alert-success">{successMsg}</div>}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Rol</label>
          <select className="form-select" value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="empleado">Empleado</option>
            <option value="cliente">Cliente</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success w-100">Crear</button>
      </form>
    </div>
  );
}
