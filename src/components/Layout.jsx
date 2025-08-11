import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // ✅ Verificamos si hay token

  const btnStyle = {
    padding: "10px 20px",
    margin: "0 10px 10px 0",
    fontSize: 16,
    cursor: "pointer",
    borderRadius: 4,
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
  };

  return (
    <>
      <header
        style={{ padding: 20, background: "#f0f0f0", textAlign: "center" }}
      >
        <h1>Bienvenido</h1>
        <div style={{ marginTop: 10 }}>
          {!token ? (
            <button style={btnStyle} onClick={() => navigate("/")}>
              Login
            </button>
          ) : (
            <>
              <button style={btnStyle} onClick={() => navigate("/productos")}>
                Ver Productos
              </button>
              <button
                style={btnStyle}
                onClick={() => navigate("/buscar-productos")}
              >
                Buscar Productos
              </button>
              <button
                style={btnStyle}
                onClick={() => navigate("/crear-categoria")}
              >
                Crear Categoría
              </button>
              <button
                style={btnStyle}
                onClick={() => navigate("/crear-producto")}
              >
                Crear Producto
              </button>
              <button
                style={{ ...btnStyle, backgroundColor: "#dc3545" }}
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                  window.location.reload();
                }}
              >
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      </header>

      <main style={{ padding: 30 }}>
        <Outlet />
      </main>
    </>
  );
}
