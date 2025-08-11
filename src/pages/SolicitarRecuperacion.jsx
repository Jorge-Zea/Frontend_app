import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Form.css";

export default function SolicitarRecuperacion() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await axios.post("http://localhost:8080/auth/solicitar", { email });
      setMessage("Correo de recuperación enviado");
      setEmail("");
    } catch (err) {
      setError("Error al enviar correo de recuperación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Solicitar Recuperación de Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
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
