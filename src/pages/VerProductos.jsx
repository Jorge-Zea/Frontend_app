import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Productos.css";
import { useNavigate } from "react-router-dom";

export default function VerProductos() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/productos/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProductos(res.data);
      } catch (err) {
        setError("No se pudieron cargar los productos");
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="productos-container">
      <h2>Lista de Productos</h2>
      {error && <p className="error">{error}</p>}
      <div className="productos-grid">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="producto-card"
            onClick={() => navigate(`/productos/${producto.id}`)}
          >
            <img src={producto.imagenUrl} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p className="precio">${producto.precio.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
