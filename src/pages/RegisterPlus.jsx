import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Building2,
  ArrowRight,
  Briefcase,
} from "lucide-react";

export default function RegisterPlus() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    owner: "",
    business: "",
    email: "",
    phone: "",
    service: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRequest = {
      id: Date.now(),
      owner: form.owner,
      business: form.business,
      email: form.email,
      phone: form.phone,
      service: form.service,
      status: "New",
      createdAt: new Date().toISOString(),
    };

    const existing =
      JSON.parse(localStorage.getItem("autocore_requests")) || [];

    localStorage.setItem(
      "autocore_requests",
      JSON.stringify([newRequest, ...existing])
    );

    navigate("/login-plus?registered=1");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.4)]"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center">
          Solicitar acceso
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* OWNER */}
          <div className="flex items-center gap-3 border border-white/10 rounded-2xl px-4 py-3 bg-black/40">
            <User className="h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Nombre"
              className="bg-transparent w-full outline-none"
              onChange={(e) =>
                setForm({ ...form, owner: e.target.value })
              }
            />
          </div>

          {/* BUSINESS */}
          <div className="flex items-center gap-3 border border-white/10 rounded-2xl px-4 py-3 bg-black/40">
            <Building2 className="h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Nombre del negocio"
              className="bg-transparent w-full outline-none"
              onChange={(e) =>
                setForm({ ...form, business: e.target.value })
              }
            />
          </div>

          {/* EMAIL */}
          <div className="flex items-center gap-3 border border-white/10 rounded-2xl px-4 py-3 bg-black/40">
            <Mail className="h-4 w-4 text-zinc-500" />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent w-full outline-none"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* PHONE */}
          <div className="flex items-center gap-3 border border-white/10 rounded-2xl px-4 py-3 bg-black/40">
            <Phone className="h-4 w-4 text-zinc-500" />
            <input
              type="tel"
              placeholder="Teléfono"
              className="bg-transparent w-full outline-none"
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
          </div>

          {/* SERVICE */}
          <div className="flex items-center gap-3 border border-white/10 rounded-2xl px-4 py-3 bg-black/40">
            <Briefcase className="h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Servicio que necesitas"
              className="bg-transparent w-full outline-none"
              onChange={(e) =>
                setForm({ ...form, service: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition"
          >
            Enviar solicitud
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}