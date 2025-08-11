import React, { useState } from "react";
import axios from "axios";
import { useSearchParams, Link } from "react-router-dom";
import "./Form.css";

export default function Restablecer() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Token inválido o no proporcionado");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await axios.post("http://localhost:8080/auth/restablecer", {
        token,
        password,
      });
      setMessage("Contraseña restablecida correctamente");
      setPassword("");
    } catch (err) {
      setError("Error al restablecer contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label>Nueva Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Restableciendo..." : "Restablecer"}
        </button>
      </form>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <p>
        <Link to="/login">Volver a Iniciar Sesión</Link>
      </p>
    </div>
  );
}
