import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

export default function CrearCategoria() {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:8080/api/categorias",
        { nombre },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMensaje(`Categoría creada: ${res.data.nombre} (ID: ${res.data.id})`);
      setNombre("");
    } catch (err) {
      setError("Error al crear categoría");
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Categoría</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <button type="submit">Crear</button>
      </form>
      {mensaje && <p className="success">{mensaje}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
