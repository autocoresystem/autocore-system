import { Routes, Route } from "react-router-dom";

// Parte pública
import PublicHome from "./pages/PublicHome";

// Demo viejo
import Dashboard from "./Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Nuevos premium
import LoginPlus from "./pages/LoginPlus";
import RegisterPlus from "./pages/RegisterPlus";

// Portales
import ClientPortal from "./pages/ClientPortal";
import AdminPortal from "./pages/AdminPortal";

export default function App() {
  return (
    <Routes>
      {/* Landing pública */}
      <Route path="/" element={<PublicHome />} />

      {/* Demo viejo */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Nuevos premium */}
      <Route path="/login-plus" element={<LoginPlus />} />
      <Route path="/register-plus" element={<RegisterPlus />} />

      {/* Portales */}
      <Route path="/portal" element={<ClientPortal />} />
      <Route path="/admin" element={<AdminPortal />} />
    </Routes>
  );
}