import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/apple-touch-icon.png"; // cámbialo si tu archivo tiene otro nombre

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [interactive, setInteractive] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setInteractive(true);
    }, 4300);

    return () => clearTimeout(timer);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        size: Math.random() * 2.8 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 14 + 10,
        delay: Math.random() * 5,
        driftX: Math.random() * 60 - 30,
        driftY: Math.random() * 50 - 25,
        opacity: Math.random() * 0.45 + 0.2,
      })),
    []
  );

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!interactive) return;

    if (form.email === "admin@test.com") {
      navigate("/admin");
    } else {
      navigate("/portal");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <AnimatedBackground particles={particles} />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-6">
        <div className="relative h-[720px] w-full max-w-[1600px] overflow-hidden rounded-[34px] border border-white/10 bg-black/20 shadow-[0_0_100px_rgba(255,0,0,0.08)] backdrop-blur-sm">
          {/* halo central */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,30,30,0.10),transparent_22%),radial-gradient(circle_at_50%_55%,rgba(255,255,255,0.05),transparent_30%)]" />

          {/* LOGO ANIMATION */}
          <motion.div
            initial={{
              x: 0,
              y: 0,
              scale: 0.12,
              opacity: 0,
            }}
            animate={{
              x: [0, 0, 0, 240, 350, 350],
              y: [0, 0, 0, 0, 0, 0],
              scale: [0.12, 1, 1, 1, 0.8, 0.8],
              opacity: [0, 1, 1, 1, 1, 1],
            }}
            transition={{
              duration: 4.1,
              times: [0, 0.18, 0.42, 0.68, 0.86, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-1/2 top-1/2 z-30 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          >
            <motion.img
              src={logo}
              alt="AutoCore logo"
              className="h-[230px] w-[230px] object-contain drop-shadow-[0_0_35px_rgba(255,40,40,0.25)]"
              animate={{
                rotate: [0, 0, 8, -6, 0, 0],
              }}
              transition={{
                duration: 3.6,
                times: [0, 0.3, 0.5, 0.7, 1, 1],
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* BRAND TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 15 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 3.7, duration: 0.7, ease: "easeOut" }}
            className="absolute left-[8%] top-[57%] z-20 hidden md:block"
          >
            <p className="mb-3 text-xs uppercase tracking-[0.42em] text-white/35">
              Brand Motion
            </p>
            <h1 className="text-6xl font-bold leading-[0.95]">
              AutoCore
              <span className="mt-2 block text-white/70">System</span>
            </h1>
          </motion.div>

          {/* LOGIN PANEL */}
          <motion.div
            initial={{ x: 620, opacity: 0 }}
            animate={{
              x: [620, 620, 620, 260, 70, 0],
              opacity: [0, 0, 1, 1, 1, 1],
            }}
            transition={{
              duration: 4.1,
              times: [0, 0.28, 0.4, 0.68, 0.86, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute right-0 top-0 z-20 flex h-full w-full items-center justify-center md:w-[58%]"
          >
            <div className="w-full max-w-[620px] px-4 md:px-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.15, duration: 0.55 }}
                className="rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7 shadow-[0_0_80px_rgba(255,255,255,0.03)] backdrop-blur-2xl md:p-10"
              >
                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.35, duration: 0.5 }}
                  className="mb-8"
                >
                  <div className="mb-4 flex items-center gap-3 md:hidden">
                    <img
                      src={logo}
                      alt="AutoCore logo"
                      className="h-12 w-12 object-contain"
                    />
                    <span className="text-xl font-semibold">AutoCore System</span>
                  </div>

                  <p className="mb-2 text-xs uppercase tracking-[0.38em] text-white/40">
                    Secure Access
                  </p>
                  <h2 className="text-4xl font-bold md:text-5xl">Bienvenido</h2>
                  <p className="mt-4 max-w-lg text-base leading-7 text-white/55">
                    Accede a tu sistema con una experiencia visual más moderna,
                    elegante y alineada con la identidad de AutoCore.
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.5, duration: 0.45 }}
                  >
                    <InputShell icon={<Mail size={18} />}>
                      <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={form.email}
                        onChange={handleChange}
                        disabled={!interactive}
                        className="w-full bg-transparent px-1 py-4 text-white placeholder:text-white/35 focus:outline-none disabled:opacity-60"
                      />
                    </InputShell>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.65, duration: 0.45 }}
                  >
                    <InputShell icon={<Lock size={18} />}>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={handleChange}
                        disabled={!interactive}
                        className="w-full bg-transparent px-1 py-4 text-white placeholder:text-white/35 focus:outline-none disabled:opacity-60"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        disabled={!interactive}
                        className="text-white/45 transition hover:text-white disabled:opacity-50"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </InputShell>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.8, duration: 0.45 }}
                    className="flex items-center justify-between px-1 text-sm"
                  >
                    <label className="flex items-center gap-2 text-white/45">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-red-600"
                        disabled={!interactive}
                      />
                      Recordarme
                    </label>

                    <button
                      type="button"
                      disabled={!interactive}
                      className="text-white/45 transition hover:text-red-300 disabled:opacity-50"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.95, duration: 0.45 }}
                    whileHover={interactive ? { scale: 1.015 } : {}}
                    whileTap={interactive ? { scale: 0.985 } : {}}
                    disabled={!interactive}
                    className="group relative mt-2 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 px-5 py-4 font-semibold text-white shadow-[0_8px_30px_rgba(255,0,0,0.28)] transition disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-1000 group-hover:translate-x-full" />
                    <span className="relative z-10">
                      {interactive ? "Iniciar sesión" : "Cargando acceso..."}
                    </span>
                  </motion.button>
                </form>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4.1, duration: 0.5 }}
                  className="mt-7 text-center text-sm text-white/45"
                >
                  ¿No tienes cuenta?{" "}
                  <button
                    type="button"
                    disabled={!interactive}
                    className="font-medium text-red-400 transition hover:text-red-300 disabled:opacity-50"
                  >
                    Regístrate
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* extra left glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 1 }}
            className="absolute left-[6%] top-[48%] hidden h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-red-600/10 blur-[130px] md:block"
          />
        </div>
      </div>
    </div>
  );
}

function InputShell({ icon, children }) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 rounded-2xl bg-red-500/10 opacity-0 blur-xl transition duration-300 group-focus-within:opacity-100" />
      <div className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 transition duration-300 hover:border-white/20 focus-within:border-red-500/40">
        <span className="text-white/35">{icon}</span>
        {children}
      </div>
    </div>
  );
}

function AnimatedBackground({ particles }) {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#000000_0%,#050505_18%,#120000_36%,#1b0303_52%,#050505_72%,#000000_100%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,0,0,0.15),transparent_18%),radial-gradient(circle_at_75%_25%,rgba(255,60,60,0.08),transparent_18%),radial-gradient(circle_at_55%_70%,rgba(255,0,0,0.10),transparent_22%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.04),transparent_14%)]" />

      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              top: `${p.top}%`,
              opacity: p.opacity,
              boxShadow: "0 0 8px rgba(255,255,255,0.5)",
            }}
            animate={{
              x: [0, p.driftX, 0, -p.driftX * 0.4, 0],
              y: [0, p.driftY, 0, -p.driftY * 0.3, 0],
              opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.8, p.opacity],
              scale: [1, 1.15, 1, 0.95, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </>
  );
}