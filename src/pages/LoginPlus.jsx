import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 DEMO LOGIC
    if (!isRegister) {
      if (form.email === "admin@test.com") {
        navigate("/admin");
      } else {
        navigate("/portal");
      }
    } else {
      alert("Cuenta creada (demo)");
      setIsRegister(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] flex items-center justify-center px-4 text-white">

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl grid md:grid-cols-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >

        {/* LEFT SIDE */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-red-600/20 to-black relative">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-white">
              AutoCore System
            </h1>
            <p className="text-gray-300 mt-2">
              Control total de tu negocio
            </p>
          </motion.div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-10">

          <h2 className="text-2xl font-bold mb-2">
            {isRegister ? "Crear cuenta" : "Bienvenido"}
          </h2>

          <p className="text-gray-400 mb-6">
            {isRegister
              ? "Regístrate para empezar"
              : "Inicia sesión en tu sistema"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {isRegister && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-red-500 outline-none"
                />

                <input
                  type="text"
                  name="lastName"
                  placeholder="Apellido"
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-red-500 outline-none"
                />
              </>
            )}

            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-red-500 outline-none"
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-red-500 outline-none pr-10"
              />

              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            {isRegister && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-red-500 outline-none"
              />
            )}

            {/* BUTTON */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold"
            >
              {isRegister ? "Crear cuenta" : "Iniciar sesión"}
            </motion.button>

          </form>

          {/* TOGGLE */}
          <p className="text-sm text-gray-400 mt-6 text-center">
            {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
            <span
              onClick={() => setIsRegister(!isRegister)}
              className="text-red-500 ml-1 cursor-pointer hover:underline"
            >
              {isRegister ? "Inicia sesión" : "Regístrate"}
            </span>
          </p>

        </div>
      </motion.div>
    </div>
  );
}