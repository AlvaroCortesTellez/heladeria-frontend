import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("cliente");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // 1. Crear usuario en Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    const user = data.user;

    // 2. Insertar datos adicionales en la tabla "users"
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: user.id,
        nombre,
        rol,
      },
    ]);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setSuccess("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
    setEmail("");
    setPassword("");
    setNombre("");
    setRol("cliente");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Registrar Usuario</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleRegister} className="card card-body">
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
          <label className="form-label">Correo electrónico</label>
          <input
            type=
