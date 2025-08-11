import React, { useState } from "react";
import axios from "axios";

export default function BuscarProductos() {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState("");

  const buscar = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:8080/api/productos/buscar?q=${encodeURIComponent(
          query
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResultados(res.data);
      setError("");
    } catch (err) {
      setError("Error al buscar productos");
      setResultados([]);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Buscar Productos</h2>
      <input
        type="text"
        placeholder="Ingresa nombre o descripción"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 12 }}
      />
      <button onClick={buscar} disabled={!query.trim()}>
        Buscar
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {resultados.map((producto) => (
          <li
            key={producto.id}
            style={{
              borderBottom: "1px solid #ccc",
              marginBottom: 12,
              paddingBottom: 12,
            }}
          >
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>
              <strong>Precio:</strong> ${producto.precio.toFixed(2)}
            </p>
            {producto.imagenUrl && (
              <img
                src={producto.imagenUrl}
                alt={producto.nombre}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
