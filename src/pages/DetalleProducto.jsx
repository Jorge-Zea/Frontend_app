import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:8080/api/productos/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducto(res.data);
      } catch (err) {
        setError("No se pudo cargar el producto");
      }
    };

    fetchProducto();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>{producto.nombre}</h2>
      <img
        src={producto.imagenUrl}
        alt={producto.nombre}
        style={{ width: "100%", height: "auto", marginBottom: 20 }}
      />
      <p>
        <strong>Descripción:</strong> {producto.descripcion}
      </p>
      <p>
        <strong>Precio:</strong> ${producto.precio.toFixed(2)}
      </p>
    </div>
  );
}
