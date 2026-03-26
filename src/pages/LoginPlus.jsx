import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [ready, setReady] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 55 }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 4,
        opacity: Math.random() * 0.5 + 0.2,
        driftX: Math.random() * 30 - 15,
        driftY: Math.random() * 30 - 15,
      })),
    []
  );

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ready) return;

    if (form.email === "admin@test.com") {
      navigate("/admin");
    } else {
      navigate("/portal");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <ParticleField particles={particles} />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_35%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_30%,transparent_70%,rgba(255,255,255,0.02))]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="relative h-[620px] w-full max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] shadow-[0_0_80px_rgba(255,255,255,0.04)] backdrop-blur-[2px]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.015] via-transparent to-white/[0.02]" />

          <motion.div
            initial={{ x: 500, opacity: 1 }}
            animate={{ x: 0 }}
            transition={{
              duration: 1.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute top-1/2 right-[10%] z-30 hidden -translate-y-1/2 md:block"
          >
            <motion.div
              animate={{ rotate: [0, 120, 180] }}
              transition={{
                duration: 1.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <GearLogo />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0.15] }}
                transition={{ duration: 1.6 }}
                className="absolute inset-0 rounded-full bg-white/10 blur-3xl"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.35,
              duration: 1.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute right-0 top-0 z-20 flex h-full w-full items-center justify-center md:w-[58%]"
          >
            <div className="w-full max-w-xl px-5 md:px-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.35, duration: 0.5 }}
                className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_50px_rgba(255,255,255,0.03)] backdrop-blur-xl md:p-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.55, duration: 0.45 }}
                  className="mb-8"
                >
                  <div className="mb-4 flex items-center gap-3 md:hidden">
                    <div className="scale-[0.42] origin-left">
                      <GearLogo />
                    </div>
                    <span className="text-lg font-semibold tracking-wide">
                      AutoCore System
                    </span>
                  </div>

                  <p className="mb-2 text-xs uppercase tracking-[0.35em] text-white/45">
                    Secure Access
                  </p>
                  <h1 className="text-3xl font-bold md:text-4xl">
                    Bienvenido
                  </h1>
                  <p className="mt-3 max-w-md text-sm text-white/55 md:text-base">
                    Accede a tu sistema con una entrada moderna, limpia y con
                    identidad visual de AutoCore.
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7, duration: 0.4 }}
                  >
                    <InputShell icon={<Mail size={18} />}>
                      <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={form.email}
                        onChange={handleChange}
                        disabled={!ready}
                        className="w-full bg-transparent px-1 py-4 text-white placeholder:text-white/35 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                      />
                    </InputShell>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.82, duration: 0.4 }}
                  >
                    <InputShell icon={<Lock size={18} />}>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={handleChange}
                        disabled={!ready}
                        className="w-full bg-transparent px-1 py-4 text-white placeholder:text-white/35 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        disabled={!ready}
                        className="text-white/45 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </InputShell>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.94, duration: 0.4 }}
                    className="flex items-center justify-between px-1 text-sm"
                  >
                    <label className="flex items-center gap-2 text-white/50">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-white"
                        disabled={!ready}
                      />
                      Recordarme
                    </label>

                    <button
                      type="button"
                      className="text-white/50 transition hover:text-white"
                      disabled={!ready}
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.05, duration: 0.45 }}
                    whileHover={ready ? { scale: 1.015 } : {}}
                    whileTap={ready ? { scale: 0.985 } : {}}
                    disabled={!ready}
                    className="group relative mt-3 w-full overflow-hidden rounded-2xl border border-white/15 bg-white px-5 py-4 font-semibold text-black transition disabled:cursor-not-allowed disabled:bg-white/30 disabled:text-black/50"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition duration-1000 group-hover:translate-x-full" />
                    <span className="relative z-10">
                      {ready ? "Iniciar sesión" : "Cargando acceso..."}
                    </span>
                  </motion.button>
                </form>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.15, duration: 0.5 }}
                  className="mt-7 text-center text-sm text-white/45"
                >
                  ¿No tienes cuenta?{" "}
                  <button
                    type="button"
                    className="font-medium text-white transition hover:text-white/75"
                    disabled={!ready}
                  >
                    Regístrate
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0.1] }}
            transition={{ delay: 1.15, duration: 1.1 }}
            className="absolute left-[8%] top-1/2 hidden h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-white/10 blur-[120px] md:block"
          />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.75, duration: 0.6 }}
            className="absolute left-[7%] top-1/2 z-10 hidden max-w-[340px] -translate-y-1/2 md:block"
          >
            <p className="mb-4 text-xs uppercase tracking-[0.45em] text-white/35">
              Brand Motion
            </p>
            <h2 className="text-5xl font-bold leading-tight text-white/95">
              AutoCore
              <span className="block text-white/65">System</span>
            </h2>
            <p className="mt-5 text-base leading-7 text-white/45">
              Una experiencia de acceso distinta. Minimalista, tecnológica y
              construida alrededor del movimiento de tu marca.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function InputShell({ icon, children }) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 rounded-2xl bg-white/[0.03] opacity-0 blur-xl transition duration-300 group-focus-within:opacity-100" />
      <div className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 transition duration-300 hover:border-white/15 focus-within:border-white/30">
        <span className="text-white/35">{icon}</span>
        {children}
      </div>
    </div>
  );
}

function ParticleField({ particles }) {
  return (
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
          }}
          animate={{
            x: [0, p.driftX, 0],
            y: [0, p.driftY, 0],
            opacity: [p.opacity * 0.7, p.opacity, p.opacity * 0.7],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

function GearLogo() {
  return (
    <div className="relative flex h-[190px] w-[190px] items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl" />

      <svg
        viewBox="0 0 200 200"
        className="relative z-10 h-full w-full drop-shadow-[0_0_22px_rgba(255,255,255,0.18)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M100 18L114 24L129 19L138 31L154 32L158 48L172 56L169 72L180 84L171 98L177 113L164 123L163 139L147 143L139 157L123 154L111 166L97 159L82 164L71 152L55 151L49 136L34 129L35 113L24 101L31 87L27 72L40 62L42 46L58 41L67 27L83 30L100 18Z"
            fill="url(#gearFill)"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="2.5"
          />
          <circle
            cx="100"
            cy="94"
            r="30"
            fill="rgba(0,0,0,0.75)"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="2.5"
          />
          <circle
            cx="100"
            cy="94"
            r="12"
            fill="rgba(255,255,255,0.9)"
            opacity="0.9"
          />
        </g>

        <defs>
          <linearGradient id="gearFill" x1="30" y1="20" x2="170" y2="170">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="45%" stopColor="rgba(210,210,210,0.88)" />
            <stop offset="100%" stopColor="rgba(120,120,120,0.95)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}