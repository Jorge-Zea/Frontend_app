import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SolicitarRecuperacion from "./pages/SolicitarRecuperacion";
import Restablecer from "./pages/Restablecer";
import CrearCategoria from "./pages/CrearCategoria";
import CrearProducto from "./pages/CrearProducto";
import VerProductos from "./pages/VerProductos";
import BuscarProductos from "./pages/BuscarProductos";
import Layout from "./components/Layout";
import DetalleProducto from "./pages/DetalleProducto";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/solicitar-recuperacion"
            element={<SolicitarRecuperacion />}
          />
          <Route path="/restablecer" element={<Restablecer />} />
          <Route path="/crear-categoria" element={<CrearCategoria />} />
          <Route path="/crear-producto" element={<CrearProducto />} />
          <Route path="/productos" element={<VerProductos />} />
          <Route path="/buscar-productos" element={<BuscarProductos />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
