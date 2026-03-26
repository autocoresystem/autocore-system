import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ShieldCheck, Sparkles, Lock, Mail } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(180,0,0,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,0,0,0.12),transparent_25%),linear-gradient(to_bottom_right,#020202,#090909,#000000)]" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:40px_40px]" />

      {/* MOVING BLOBS */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-red-700/20 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -60, 0], y: [0, 50, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-red-500/10 blur-[140px]"
      />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/4 h-48 w-48 rounded-full bg-white/5 blur-[100px]"
      />

      {/* MAIN */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] shadow-[0_0_80px_rgba(255,0,0,0.08)] backdrop-blur-2xl md:grid-cols-2"
        >
          {/* LEFT PANEL */}
          <div className="relative hidden min-h-[650px] overflow-hidden md:block">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(120,0,0,0.35),rgba(0,0,0,0.75),rgba(255,0,0,0.08))]" />

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-10 top-10 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl"
            >
              <div className="flex items-center gap-2 text-sm text-gray-200">
                <Sparkles size={16} className="text-red-400" />
                Sistema inteligente y moderno
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-10 top-28 rounded-2xl border border-red-500/20 bg-black/30 px-5 py-4 backdrop-blur-xl"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                Seguridad
              </p>
              <div className="mt-2 flex items-center gap-2 text-lg font-semibold text-white">
                <ShieldCheck className="text-red-500" size={18} />
                Acceso protegido
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-16 left-12 w-56 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
            >
              <p className="text-xs text-gray-400">Sesiones activas</p>
              <h4 className="mt-2 text-3xl font-bold">+1,284</h4>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1.8 }}
                  className="h-full rounded-full bg-gradient-to-r from-red-600 to-red-400"
                />
              </div>
            </motion.div>

            <div className="relative z-10 flex h-full flex-col justify-center px-14">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-4 text-sm uppercase tracking-[0.35em] text-red-400"
              >
                Future Access
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-md text-5xl font-extrabold leading-tight"
              >
                AutoCore <span className="text-red-500">System</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 max-w-lg text-lg text-gray-300"
              >
                Una experiencia de acceso moderna, animada y premium para un
                sistema que se siente poderoso desde el primer segundo.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-10 flex gap-4"
              >
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-lg">
                  <p className="text-xs text-gray-400">Tiempo real</p>
                  <p className="mt-1 text-lg font-semibold">Dashboard live</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-lg">
                  <p className="text-xs text-gray-400">UX premium</p>
                  <p className="mt-1 text-lg font-semibold">Motion + Glass</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="relative flex min-h-[650px] items-center justify-center p-6 md:p-10">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]" />

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="relative z-10 w-full max-w-md"
            >
              <div className="mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs text-red-300"
                >
                  <Sparkles size={14} />
                  Premium access experience
                </motion.div>

                <h2 className="text-4xl font-bold tracking-tight">
                  {isRegister ? "Crear cuenta" : "Bienvenido"}
                </h2>
                <p className="mt-3 text-base text-gray-400">
                  {isRegister
                    ? "Regístrate para entrar al ecosistema AutoCore."
                    : "Inicia sesión en tu sistema con una experiencia futurista."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  {isRegister && (
                    <motion.div
                      key="register-fields"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 overflow-hidden"
                    >
                      <GlassInput
                        name="name"
                        placeholder="Nombre"
                        value={form.name}
                        onChange={handleChange}
                      />
                      <GlassInput
                        name="lastName"
                        placeholder="Apellido"
                        value={form.lastName}
                        onChange={handleChange}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <GlassInput
                  name="email"
                  type="email"
                  placeholder="Correo electrónico"
                  value={form.email}
                  onChange={handleChange}
                  icon={<Mail size={18} />}
                />

                <div className="group relative">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600/0 via-red-500/10 to-red-600/0 opacity-0 blur-xl transition duration-500 group-focus-within:opacity-100" />
                  <div className="relative flex items-center rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl transition duration-300 focus-within:border-red-500/50 hover:border-white/20">
                    <span className="pl-4 text-gray-500">
                      <Lock size={18} />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Contraseña"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full bg-transparent px-3 py-4 text-white placeholder:text-gray-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="pr-4 text-gray-400 transition hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {isRegister && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <GlassInput
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirmar contraseña"
                        value={form.confirmPassword}
                        onChange={handleChange}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isRegister && (
                  <div className="flex items-center justify-between px-1 text-sm">
                    <label className="flex items-center gap-2 text-gray-400">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-white/20 bg-transparent accent-red-600"
                      />
                      Recordarme
                    </label>
                    <button
                      type="button"
                      className="text-gray-400 transition hover:text-red-400"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative mt-2 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 px-5 py-4 font-semibold text-white shadow-[0_10px_40px_rgba(255,0,0,0.25)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-1000 group-hover:translate-x-full" />
                  <span className="relative z-10">
                    {isRegister ? "Crear cuenta" : "Iniciar sesión"}
                  </span>
                </motion.button>
              </form>

              <div className="mt-8 text-center text-sm text-gray-400">
                {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="font-medium text-red-400 transition hover:text-red-300"
                >
                  {isRegister ? "Inicia sesión" : "Regístrate"}
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function GlassInput({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
}) {
  return (
    <div className="group relative">
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600/0 via-red-500/10 to-red-600/0 opacity-0 blur-xl transition duration-500 group-focus-within:opacity-100" />
      <div className="relative flex items-center rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl transition duration-300 focus-within:border-red-500/50 hover:border-white/20">
        {icon && <span className="pl-4 text-gray-500">{icon}</span>}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none"
        />
      </div>
    </div>
  );
}