import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/apple-touch-icon.png";

export default function Login() {
  const navigate = useNavigate();

  const [phase, setPhase] = useState(0);
  const [interactive, setInteractive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const timeline = [
      setTimeout(() => setPhase(1), 200),   // logo aparece
      setTimeout(() => setPhase(2), 700),   // logo crece
      setTimeout(() => setPhase(3), 1700),  // pausa
      setTimeout(() => setPhase(4), 2200),  // login aparece derecha
      setTimeout(() => setPhase(5), 2700),  // golpe 1
      setTimeout(() => setPhase(6), 3200),  // golpe 2
      setTimeout(() => setPhase(7), 3750),  // golpe 3
      setTimeout(() => setPhase(8), 4400),  // acomodo final
      setTimeout(() => {
        setPhase(9);                        // branding final
        setInteractive(true);
      }, 5000),
    ];

    return () => timeline.forEach(clearTimeout);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 110 }, (_, i) => ({
        id: i,
        size: Math.random() * 2.7 + 0.8,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 6,
        driftX: Math.random() * 90 - 45,
        driftY: Math.random() * 70 - 35,
        opacity: 0.18 + Math.random() * 0.55,
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

  const logoAnimation = getLogoAnimation(phase);
  const panelAnimation = getPanelAnimation(phase);
  const brandVisible = phase >= 9;
  const formVisible = phase >= 8;

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <AnimatedBackground particles={particles} />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-4">
        <div className="relative h-[780px] w-full max-w-[1680px] overflow-hidden rounded-[38px] border border-white/10 bg-black/20 shadow-[0_0_100px_rgba(255,0,0,0.12)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,0,0,0.10),transparent_18%),radial-gradient(circle_at_74%_35%,rgba(255,255,255,0.04),transparent_16%),radial-gradient(circle_at_20%_60%,rgba(255,0,0,0.06),transparent_18%)]" />

          {/* LOGO ANIMADO PRINCIPAL */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-30 hidden -translate-x-1/2 -translate-y-1/2 md:block"
            animate={logoAnimation}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.img
              src={logo}
              alt="AutoCore logo"
              className="h-[250px] w-[250px] object-contain drop-shadow-[0_0_45px_rgba(255,40,40,0.35)]"
              animate={{
                rotate: phase >= 5 && phase <= 7 ? [0, 6, -5, 0] : 0,
              }}
              transition={{
                duration: 0.35,
              }}
            />
          </motion.div>

          {/* BRANDING FINAL IZQUIERDA */}
          <AnimatePresence>
            {brandVisible && (
              <motion.div
                initial={{ opacity: 0, x: -30, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="absolute left-[6.5%] top-1/2 z-20 hidden -translate-y-1/2 md:flex md:items-center md:gap-6"
              >
                <motion.img
                  src={logo}
                  alt="AutoCore logo brand"
                  className="h-[95px] w-[95px] object-contain drop-shadow-[0_0_30px_rgba(255,40,40,0.28)]"
                  initial={{ rotate: -10, scale: 0.9 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.45em] text-white/35">
                    AutoCore Identity
                  </p>
                  <h1 className="text-5xl font-bold leading-[0.95]">
                    AutoCore
                    <span className="mt-2 block text-white/72">System</span>
                  </h1>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* LOGIN PANEL */}
          <motion.div
            animate={panelAnimation}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute right-0 top-0 z-20 flex h-full w-full items-center justify-center md:w-[56%]"
          >
            <div className="w-full max-w-[650px] px-4 md:px-8">
              <div className="rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7 shadow-[0_0_80px_rgba(255,255,255,0.04)] backdrop-blur-2xl md:p-10">
                <AnimatePresence>
                  {formVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45 }}
                    >
                      <div className="mb-8">
                        <div className="mb-4 flex items-center gap-3 md:hidden">
                          <img
                            src={logo}
                            alt="AutoCore mobile logo"
                            className="h-12 w-12 object-contain"
                          />
                          <span className="text-xl font-semibold">
                            AutoCore System
                          </span>
                        </div>

                        <p className="mb-2 text-xs uppercase tracking-[0.38em] text-white/40">
                          Secure Access
                        </p>
                        <h2 className="text-4xl font-bold md:text-5xl">
                          Bienvenido
                        </h2>
                        <p className="mt-4 max-w-lg text-base leading-7 text-white/55">
                          Inicia sesión en tu sistema con una entrada visual más
                          fuerte, dinámica y propia de AutoCore.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
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

                        <div className="flex items-center justify-between px-1 text-sm">
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
                        </div>

                        <motion.button
                          whileHover={interactive ? { scale: 1.015 } : {}}
                          whileTap={interactive ? { scale: 0.985 } : {}}
                          disabled={!interactive}
                          className="group relative mt-2 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 px-5 py-4 font-semibold text-white shadow-[0_10px_35px_rgba(255,0,0,0.30)] transition disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-1000 group-hover:translate-x-full" />
                          <span className="relative z-10">
                            {interactive ? "Iniciar sesión" : "Cargando acceso..."}
                          </span>
                        </motion.button>
                      </form>

                      <div className="mt-7 text-center text-sm text-white/45">
                        ¿No tienes cuenta?{" "}
                        <button
                          type="button"
                          disabled={!interactive}
                          className="font-medium text-red-400 transition hover:text-red-300 disabled:opacity-50"
                        >
                          Regístrate
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function getLogoAnimation(phase) {
  switch (phase) {
    case 0:
      return { x: 0, y: 0, scale: 0.16, opacity: 0 };
    case 1:
      return { x: 0, y: 0, scale: 0.16, opacity: 1 };
    case 2:
      return { x: 0, y: 0, scale: 1, opacity: 1 };
    case 3:
      return { x: 0, y: 0, scale: 1, opacity: 1 };
    case 4:
      return { x: 0, y: 0, scale: 1, opacity: 1 };
    case 5:
      return { x: 190, y: 0, scale: 1, opacity: 1 };
    case 6:
      return { x: 280, y: 0, scale: 0.97, opacity: 1 };
    case 7:
      return { x: 365, y: 0, scale: 0.92, opacity: 1 };
    case 8:
      return { x: 430, y: 0, scale: 0.8, opacity: 1 };
    case 9:
      return { x: 430, y: 0, scale: 0.8, opacity: 0 };
    default:
      return {};
  }
}

function getPanelAnimation(phase) {
  switch (phase) {
    case 0:
    case 1:
    case 2:
    case 3:
      return { x: 980, opacity: 0 };
    case 4:
      return { x: 660, opacity: 1 };
    case 5:
      return { x: 560, opacity: 1 };
    case 6:
      return { x: 430, opacity: 1 };
    case 7:
      return { x: 250, opacity: 1 };
    case 8:
    case 9:
      return { x: 0, opacity: 1 };
    default:
      return {};
  }
}

function InputShell({ icon, children }) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 rounded-2xl bg-red-500/10 opacity-0 blur-xl transition duration-300 group-focus-within:opacity-100" />
      <div className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-black/45 px-4 transition duration-300 hover:border-white/20 focus-within:border-red-500/40">
        <span className="text-white/35">{icon}</span>
        {children}
      </div>
    </div>
  );
}

function AnimatedBackground({ particles }) {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#000000_0%,#070707_15%,#1a0101_30%,#360707_48%,#170202_68%,#000000_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,0,0,0.20),transparent_16%),radial-gradient(circle_at_75%_18%,rgba(255,70,70,0.12),transparent_15%),radial-gradient(circle_at_55%_72%,rgba(255,0,0,0.12),transparent_22%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.05),transparent_12%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:44px_44px]" />

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
              boxShadow: "0 0 10px rgba(255,255,255,0.6)",
            }}
            animate={{
              x: [0, p.driftX, 0, -p.driftX * 0.4, 0],
              y: [0, p.driftY, 0, -p.driftY * 0.3, 0],
              opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.75, p.opacity],
              scale: [1, 1.2, 1, 0.95, 1],
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