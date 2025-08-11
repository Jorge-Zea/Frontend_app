import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Form.css";

export default function CrearProducto() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/categorias", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCategorias(res.data);
      } catch (err) {
        setError("No se pudieron cargar las categorías");
      }
    };
    fetchCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:8080/api/productos",
        {
          nombre,
          descripcion,
          precio: parseFloat(precio),
          imagenUrl,
          categoria: { id: parseInt(categoriaId) },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMensaje(`Producto creado: ${res.data.nombre} (ID: ${res.data.id})`);
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setImagenUrl("");
      setCategoriaId("");
    } catch (err) {
      setError("Error al crear producto");
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Producto</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <label>Precio</label>
        <input
          type="number"
          step="0.01"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />

        <label>URL de Imagen</label>
        <input
          value={imagenUrl}
          onChange={(e) => setImagenUrl(e.target.value)}
          required
        />

        <label>Categoría</label>
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          required
        >
          <option value="">Seleccionar categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>

        <button type="submit">Crear</button>
      </form>

      {mensaje && <p className="success">{mensaje}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
