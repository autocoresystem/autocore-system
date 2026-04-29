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
    const timers = [
      setTimeout(() => setPhase(1), 200),   // logo aparece
      setTimeout(() => setPhase(2), 650),   // logo crece
      setTimeout(() => setPhase(3), 1700),  // pausa
      setTimeout(() => setPhase(4), 2250),  // panel entra
      setTimeout(() => setPhase(5), 3000),  // impacto 1
      setTimeout(() => setPhase(6), 3650),  // impacto 2
      setTimeout(() => setPhase(7), 4400),  // impacto 3
      setTimeout(() => setPhase(8), 5300),  // acomodo logo
      setTimeout(() => {
        setPhase(9);                        // branding final
        setInteractive(true);
      }, 6000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 125 }, (_, i) => ({
        id: i,
        size: Math.random() * 2.5 + 0.7,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 10 + Math.random() * 10,
        delay: Math.random() * 6,
        driftX: Math.random() * 80 - 40,
        driftY: Math.random() * 60 - 30,
        opacity: 0.15 + Math.random() * 0.5,
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

  const impactNow = phase >= 5 && phase <= 7;
  const brandVisible = phase >= 9;
  const formVisible = phase >= 8;

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <AnimatedBackground particles={particles} phase={phase} />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-4">
        <motion.div
          animate={getSceneShake(phase)}
          transition={getSceneShakeTransition(phase)}
          className="relative h-[800px] w-full max-w-[1700px] overflow-hidden rounded-[40px] border border-white/10 bg-black/20 shadow-[0_0_120px_rgba(255,0,0,0.14)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_48%,rgba(255,0,0,0.10),transparent_18%),radial-gradient(circle_at_78%_35%,rgba(255,255,255,0.04),transparent_16%)]" />

          {/* SOFT IMPACT FX */}
          <AnimatePresence mode="wait">
            {impactNow && (
              <motion.div
                key={`impact-${phase}`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: [0, 0.28, 0], scale: [0.7, 1.45, 1.8] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="pointer-events-none absolute left-[55%] top-1/2 z-10 hidden h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-300/25 md:block"
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {impactNow && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.35, 0.1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="pointer-events-none absolute left-[42%] top-1/2 z-10 hidden h-[260px] w-[500px] -translate-y-1/2 rounded-full bg-red-500/20 blur-[110px] md:block"
              />
            )}
          </AnimatePresence>

          {/* LOGO PRINCIPAL */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-30 hidden -translate-x-1/2 -translate-y-1/2 md:block"
            animate={getLogoMotion(phase)}
            transition={getLogoMotionTransition(phase)}
          >
            <motion.img
              src={logo}
              alt="AutoCore logo"
              className="h-[245px] w-[245px] object-contain drop-shadow-[0_0_55px_rgba(255,40,40,0.35)]"
              animate={getLogoRotation(phase)}
              transition={getLogoRotationTransition(phase)}
            />
          </motion.div>

          {/* BRAND LEFT FINAL */}
          <AnimatePresence>
            {brandVisible && (
              <motion.div
                initial={{ opacity: 0, x: -24, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="absolute left-[6%] top-[27%] z-20 hidden max-w-[520px] md:block"
              >
                <div className="flex items-center gap-5">
                  <motion.img
                    src={logo}
                    alt="AutoCore brand"
                    className="h-[92px] w-[92px] object-contain drop-shadow-[0_0_30px_rgba(255,40,40,0.26)]"
                    initial={{ scale: 0.92, rotate: -8 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  />
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.42em] text-white/35">
                      AutoCore Identity
                    </p>
                    <h1 className="text-5xl font-bold leading-[0.95]">
                      AutoCore
                      <span className="mt-2 block text-white/72">System</span>
                    </h1>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14, duration: 0.45 }}
                  className="mt-10"
                >
                  <p className="text-sm uppercase tracking-[0.36em] text-red-300/70">
                    Bienvenida
                  </p>

                  <h3 className="mt-4 max-w-[500px] text-[30px] font-semibold leading-tight text-white/95">
                    Una experiencia visual más fluida, elegante y con presencia real
                  </h3>

                  <p className="mt-5 max-w-[500px] text-[15px] leading-8 text-white/58">
                    AutoCore combina movimiento, identidad y precisión para crear
                    una entrada más refinada. Todo se siente más natural, más
                    premium y más alineado con una marca moderna.
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <InfoCard
                      title="Movimiento"
                      value="Más dinámico"
                    />
                    <InfoCard
                      title="Presencia"
                      value="Más profesional"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* LOGIN PANEL */}
          <motion.div
            animate={getPanelMotion(phase)}
            transition={getPanelMotionTransition(phase)}
            className="absolute right-0 top-0 z-20 flex h-full w-full items-center justify-center md:w-[56%]"
          >
            <div className="w-full max-w-[650px] px-4 md:px-8">
              <motion.div
                animate={getPanelShake(phase)}
                transition={getPanelShakeTransition(phase)}
                className="rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7 shadow-[0_0_90px_rgba(255,255,255,0.04)] backdrop-blur-2xl md:p-10"
              >
                <AnimatePresence>
                  {formVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
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
                          Inicia sesión en tu sistema con una experiencia más
                          limpia, más natural y más alineada con el nivel visual de AutoCore.
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
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function getLogoMotion(phase) {
  switch (phase) {
    case 0:
      return { x: 0, y: 0, scale: 0.14, opacity: 0 };
    case 1:
      return { x: 0, y: 0, scale: 0.14, opacity: 1 };
    case 2:
      return { x: 0, y: 0, scale: 1.02, opacity: 1 };
    case 3:
    case 4:
      return { x: 0, y: 0, scale: 1.02, opacity: 1 };
    case 5:
      return { x: 150, y: 0, scale: 1.01, opacity: 1 };
    case 6:
      return { x: 255, y: 0, scale: 0.97, opacity: 1 };
    case 7:
      return { x: 360, y: 0, scale: 0.92, opacity: 1 };
    case 8:
      return { x: 455, y: -52, scale: 0.78, opacity: 1 };
    case 9:
      return { x: 455, y: -52, scale: 0.78, opacity: 0 };
    default:
      return {};
  }
}

function getLogoMotionTransition(phase) {
  if (phase === 2) {
    return { duration: 0.95, ease: [0.22, 1, 0.36, 1] };
  }
  if (phase >= 5 && phase <= 8) {
    return { type: "spring", stiffness: 120, damping: 18, mass: 0.9 };
  }
  if (phase === 9) {
    return { duration: 0.3, ease: "easeOut" };
  }
  return { duration: 0.3, ease: "easeOut" };
}

function getLogoRotation(phase) {
  switch (phase) {
    case 2:
      return { rotate: 70 };
    case 3:
      return { rotate: 115 };
    case 4:
      return { rotate: 165 };
    case 5:
      return { rotate: 250 };
    case 6:
      return { rotate: 340 };
    case 7:
      return { rotate: 430 };
    case 8:
      return { rotate: 500 };
    case 9:
      return { rotate: 500 };
    default:
      return { rotate: 0 };
  }
}

function getLogoRotationTransition(phase) {
  if (phase >= 2 && phase <= 5) {
    return { duration: 0.7, ease: [0.22, 1, 0.36, 1] };
  }
  if (phase >= 6 && phase <= 8) {
    return { type: "spring", stiffness: 100, damping: 16, mass: 0.9 };
  }
  return { duration: 0.3, ease: "easeOut" };
}

function getPanelMotion(phase) {
  switch (phase) {
    case 0:
    case 1:
    case 2:
    case 3:
      return { x: 1040, opacity: 0 };
    case 4:
      return { x: 760, opacity: 1 };
    case 5:
      return { x: 610, opacity: 1 };
    case 6:
      return { x: 430, opacity: 1 };
    case 7:
      return { x: 210, opacity: 1 };
    case 8:
    case 9:
      return { x: 0, opacity: 1 };
    default:
      return {};
  }
}

function getPanelMotionTransition(phase) {
  if (phase === 4) {
    return { type: "spring", stiffness: 90, damping: 18 };
  }
  if (phase >= 5 && phase <= 7) {
    return { type: "spring", stiffness: 120, damping: 16, mass: 0.95 };
  }
  if (phase >= 8) {
    return { type: "spring", stiffness: 90, damping: 16 };
  }
  return { duration: 0.25, ease: "easeOut" };
}

function getPanelShake(phase) {
  if (phase === 5) return { x: [0, 7, -4, 2, 0], y: [0, -1, 0, 0] };
  if (phase === 6) return { x: [0, 10, -6, 3, 0], y: [0, -2, 1, 0] };
  if (phase === 7) return { x: [0, 13, -8, 4, 0], y: [0, -2, 1, 0] };
  return { x: 0, y: 0 };
}

function getPanelShakeTransition(phase) {
  if (phase >= 5 && phase <= 7) {
    return { duration: 0.32, ease: "easeInOut" };
  }
  return { duration: 0.2 };
}

function getSceneShake(phase) {
  if (phase === 5) return { x: [0, -2, 1, 0] };
  if (phase === 6) return { x: [0, -3, 2, 0] };
  if (phase === 7) return { x: [0, -4, 2, 0] };
  return { x: 0 };
}

function getSceneShakeTransition(phase) {
  if (phase >= 5 && phase <= 7) {
    return { duration: 0.26, ease: "easeInOut" };
  }
  return { duration: 0.2 };
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

function InfoCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.25em] text-white/35">
        {title}
      </p>
      <p className="mt-2 text-lg font-semibold text-white/90">
        {value}
      </p>
    </div>
  );
}

function AnimatedBackground({ particles, phase }) {
  return (
    <>
      <motion.div
        animate={getBackgroundZoom(phase)}
        transition={getBackgroundZoomTransition(phase)}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#000000_0%,#070707_12%,#1d0101_28%,#430909_46%,#1b0202_66%,#000000_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(255,0,0,0.22),transparent_16%),radial-gradient(circle_at_76%_18%,rgba(255,70,70,0.14),transparent_15%),radial-gradient(circle_at_55%_72%,rgba(255,0,0,0.14),transparent_22%),radial-gradient(circle_at_86%_80%,rgba(255,255,255,0.06),transparent_12%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:44px_44px]" />
      </motion.div>

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
              boxShadow: "0 0 10px rgba(255,255,255,0.65)",
            }}
            animate={{
              x: [0, p.driftX, 0, -p.driftX * 0.45, 0],
              y: [0, p.driftY, 0, -p.driftY * 0.35, 0],
              opacity: [p.opacity * 0.45, p.opacity, p.opacity * 0.8, p.opacity],
              scale: [1, 1.2, 1, 0.94, 1],
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

function getBackgroundZoom(phase) {
  if (phase === 5) return { scale: 1.012 };
  if (phase === 6) return { scale: 1.018 };
  if (phase === 7) return { scale: 1.022 };
  return { scale: 1 };
}

function getBackgroundZoomTransition(phase) {
  if (phase >= 5 && phase <= 7) {
    return { duration: 0.38, ease: "easeInOut" };
  }
  return { duration: 0.25 };
}