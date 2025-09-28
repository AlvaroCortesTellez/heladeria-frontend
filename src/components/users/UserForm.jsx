import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function UserForm({ adminUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cliente");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // 1. Crear usuario en auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      setMessage(`Error al crear usuario: ${error.message}`);
      return;
    }

    // 2. Insertar en public.users con mismo id
    const { error: insertError } = await supabase
      .from("users")
      .insert([
        { id: data.user.id, role }
      ]);

    if (insertError) {
      setMessage(`Error al guardar en tabla users: ${insertError.message}`);
      return;
    }

    setMessage(`Usuario ${email} creado correctamente con rol ${role}`);
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginRight: "0.5rem" }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginRight: "0.5rem" }}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)} style={{ marginRight: "0.5rem" }}>
        <option value="cliente">Cliente</option>
        <option value="empleado">Empleado</option>
      </select>
      <button type="submit">Crear Usuario</button>
      {message && <p style={{ marginTop: "0.5rem" }}>{message}</p>}
    </form>
  );
}
