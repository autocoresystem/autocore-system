import { useEffect, useMemo, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/apple-touch-icon.png";

export default function Login() {
  const navigate = useNavigate();

  const logoControls = useAnimation();
  const panelControls = useAnimation();
  const brandControls = useAnimation();
  const formControls = useAnimation();

  const [showPassword, setShowPassword] = useState(false);
  const [interactive, setInteractive] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const particles = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        size: Math.random() * 2.8 + 0.8,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 4,
        driftX: Math.random() * 80 - 40,
        driftY: Math.random() * 70 - 35,
        opacity: 0.25 + Math.random() * 0.55,
      })),
    []
  );

  useEffect(() => {
    const run = async () => {
      // Estado inicial
      await panelControls.set({ x: 700, opacity: 0 });
      await brandControls.set({ opacity: 0, y: 20 });
      await formControls.set({ opacity: 0, y: 20 });
      await logoControls.set({
        x: 0,
        y: 0,
        scale: 0.18,
        opacity: 0,
        rotate: 0,
      });

      // 1) logo aparece pequeño en el centro
      await logoControls.start({
        opacity: 1,
        scale: 0.18,
        transition: { duration: 0.25, ease: "easeOut" },
      });

      // 2) logo crece
      await logoControls.start({
        scale: 1,
        rotate: 0,
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
      });

      // 3 + 4 + 5) logo se mueve, aparece login, y lo empuja
      panelControls.start({
        x: [700, 700, 280, 0],
        opacity: [0, 1, 1, 1],
        transition: {
          duration: 1.6,
          times: [0, 0.12, 0.65, 1],
          ease: [0.22, 1, 0.36, 1],
        },
      });

      await logoControls.start({
        x: [0, 120, 260, 360],
        y: [0, 0, 0, 0],
        scale: [1, 1, 0.9, 0.78],
        rotate: [0, 8, -6, 0],
        transition: {
          duration: 1.6,
          times: [0, 0.35, 0.7, 1],
          ease: [0.22, 1, 0.36, 1],
        },
      });

      // 6 + 7) logo termina al lado y aparece el texto debajo
      await Promise.all([
        brandControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: "easeOut" },
        }),
        formControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: "easeOut" },
        }),
      ]);

      setInteractive(true);
    };

    run();
  }, [logoControls, panelControls, brandControls, formControls]);

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

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-4">
        <div className="relative h-[720px] w-full max-w-[1650px] overflow-hidden rounded-[36px] border border-white/10 bg-black/20 shadow-[0_0_90px_rgba(255,0,0,0.10)]">
          {/* brillo fondo */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.10),transparent_20%),radial-gradient(circle_at_70%_40%,rgba(255,255,255,0.05),transparent_18%)]" />

          {/* LOGO - nace en el centro */}
          <motion.div
            animate={logoControls}
            className="absolute left-1/2 top-1/2 z-30 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          >
            <img
              src={logo}
              alt="AutoCore logo"
              className="h-[240px] w-[240px] object-contain drop-shadow-[0_0_40px_rgba(255,40,40,0.35)]"
            />
          </motion.div>

          {/* TEXTO DEBAJO DEL LOGO */}
          <motion.div
            animate={brandControls}
            className="absolute left-[8.5%] top-[58%] z-20 hidden md:block"
          >
            <p className="mb-3 text-xs uppercase tracking-[0.45em] text-white/35">
              AutoCore Identity
            </p>
            <h1 className="text-6xl font-bold leading-[0.92]">
              AutoCore
              <span className="mt-2 block text-white/72">System</span>
            </h1>
          </motion.div>

          {/* LOGIN PANEL */}
          <motion.div
            animate={panelControls}
            className="absolute right-0 top-0 z-20 flex h-full w-full items-center justify-center md:w-[57%]"
          >
            <div className="w-full max-w-[630px] px-4 md:px-8">
              <div className="rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7 shadow-[0_0_70px_rgba(255,255,255,0.03)] backdrop-blur-2xl md:p-10">
                <motion.div animate={formControls} className="mb-8">
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
                    Ingresa a tu sistema con una entrada visual moderna y con
                    identidad propia.
                  </p>
                </motion.div>

                <motion.form
                  animate={formControls}
                  onSubmit={handleSubmit}
                  className="space-y-5"
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
                </motion.form>

                <motion.div
                  animate={formControls}
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
              </div>
            </div>
          </motion.div>

          {/* glow izquierdo */}
          <div className="absolute left-[7%] top-[50%] hidden h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-red-600/12 blur-[140px] md:block" />
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
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#000000_0%,#090909_18%,#180101_34%,#2a0606_48%,#120202_68%,#000000_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(255,0,0,0.16),transparent_18%),radial-gradient(circle_at_78%_20%,rgba(255,60,60,0.10),transparent_18%),radial-gradient(circle_at_58%_72%,rgba(255,0,0,0.10),transparent_24%),radial-gradient(circle_at_90%_82%,rgba(255,255,255,0.05),transparent_14%)]" />
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
              x: [0, p.driftX, 0, -p.driftX * 0.45, 0],
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