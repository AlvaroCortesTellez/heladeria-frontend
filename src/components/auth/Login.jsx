<<<<<<< HEAD
import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
=======
import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";

const Login = () => {
  const { login } = useContext(AuthContext);
>>>>>>> f3601b207ea0add1c759beb397192741f5012458
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

<<<<<<< HEAD
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email);
    navigate("/");
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Iniciar sesión</button>
=======
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Iniciar Sesión</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Ingresar</button>
>>>>>>> f3601b207ea0add1c759beb397192741f5012458
      </form>
    </div>
  );
};

export default Login;
