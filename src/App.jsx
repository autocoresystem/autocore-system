import { Routes, Route } from "react-router-dom";

// páginas
import PublicHome from "./pages/PublicHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientPortal from "./pages/ClientPortal";
import AdminPortal from "./pages/AdminPortal";

// demo
import Dashboard from "./Dashboard";

export default function App() {
  return (
    <Routes>
      {/* 🌐 Landing pública */}
      <Route path="/" element={<PublicHome />} />

      {/* 🎯 Demo */}
      <Route path="/demo" element={<Dashboard />} />

      {/* 🔐 Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 👤 Cliente */}
      <Route path="/portal" element={<ClientPortal />} />

      {/* 🛠 Admin */}
      <Route path="/admin" element={<AdminPortal />} />
    </Routes>
  );
}