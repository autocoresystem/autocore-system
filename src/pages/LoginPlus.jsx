import { useEffect, useMemo, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/apple-touch-icon.png";

export default function Login() {
  const navigate = useNavigate();

  const logoControls = useAnimation();
  const panelControls = useAnimation();
  const brandControls = useAnimation();
  const formControls = useAnimation();

  const [interactive, setInteractive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const particles = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        size: Math.random() * 2.5 + 0.8,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
        driftX: Math.random() * 80 - 40,
        driftY: Math.random() * 60 - 30,
        opacity: Math.random() * 0.5 + 0.2,
      })),
    []
  );

  useEffect(() => {
    const runIntro = async () => {
      setInteractive(false);

      await logoControls.set({
        x: 0,
        y: 0,
        scale: 0.16,
        opacity: 0,
        rotate: 0,
      });

      await panelControls.set({
        x: 900,
        opacity: 0,
      });

      await brandControls.set({
        opacity: 0,
        y: 20,
      });

      await formControls.set({
        opacity: 0,
        y: 16,
      });

      // 1) Logo aparece primero en el centro
      await logoControls.start({
        opacity: 1,
        scale: 0.16,
        transition: { duration: 0.25, ease: "easeOut" },
      });

      // 2) Logo se agranda
      await logoControls.start({
        scale: 1,
        transition: {
          duration: 0.95,
          ease: [0.22, 1, 0.36, 1],
        },
      });

      // 3) Aparece login desde la derecha
      panelControls.start({
        x: [900, 900, 620],
        opacity: [0, 1, 1],
        transition: {
          duration: 0.6,
          times: [0, 0.2, 1],
          ease: [0.22, 1, 0.36, 1],
        },
      });

      await new Promise((r) => setTimeout(r, 500));

      // 4) El logo choca varias veces y empuja el login
      // choque 1
      panelControls.start({
        x: [620, 560],
        transition: { duration: 0.22, ease: "easeOut" },
      });
      await logoControls.start({
        x: [0, 180, 120],
        rotate: [0, 10, 4],
        transition: {
          duration: 0.45,
          times: [0, 0.7, 1],
          ease: [0.22, 1, 0.36, 1],
        },
      });

      // choque 2
      panelControls.start({
        x: [560, 500],
        transition: { duration: 0.22, ease: "easeOut" },
      });
      await logoControls.start({
        x: [120, 250, 190],
        rotate: [4, -8, 0],
        transition: {
          duration: 0.45,
          times: [0, 0.7, 1],
          ease: [0.22, 1, 0.36, 1],
        },
      });

      // choque 3
      panelControls.start({
        x: [500, 390],
        transition: { duration: 0.28, ease: "easeOut" },
      });
      await logoControls.start({
        x: [190, 340, 285],
        rotate: [0, 8, 0],
        transition: {
          duration: 0.5,
          times: [0, 0.72, 1],
          ease: [0.22, 1, 0.36, 1],
        },
      });

      // empuje final al centro
      panelControls.start({
        x: [390, 220, 0],
        transition: {
          duration: 0.8,
          times: [0, 0.55, 1],
          ease: [0.22, 1, 0.36, 1],
        },
      });

      await logoControls.start({
        x: [285, 360, 420, 420],
        scale: [1, 0.95, 0.82, 0.82],
        rotate: [0, -6, 0, 0],
        transition: {
          duration: 0.9,
          times: [0, 0.35, 0.75, 1],
          ease: [0.22, 1, 0.36, 1],
        },
      });

      // 5) Logo se acomoda a un lado y aparece branding
      await Promise.all([
        brandControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: "easeOut" },
        }),
        formControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        }),
      ]);

      setInteractive(true);
    };

    runIntro();
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
        <div className="relative h-[760px] w-full max-w-[1650px] overflow-hidden rounded-[38px] border border-white/10 bg-black/25 shadow-[0_0_90px_rgba(255,0,0,0.12)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.08),transparent_18%),radial-gradient(circle_at_75%_35%,rgba(255,255,255,0.04),transparent_18%)]" />

          {/* LOGO CENTRAL -> EMPUJA -> IZQUIERDA */}
          <motion.div
            animate={logoControls}
            className="absolute left-1/2 top-1/2 z-30 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          >
            <img
              src={logo}
              alt="AutoCore logo"
              className="h-[240px] w-[240px] object-contain drop-shadow-[0_0_40px_rgba(255,30,30,0.35)]"
            />
          </motion.div>

          {/* BRAND FINAL: logo + texto */}
          <motion.div
            animate={brandControls}
            className="absolute left-[7%] top-1/2 z-20 hidden -translate-y-1/2 md:flex md:items-center md:gap-6"
          >
            <img
              src={logo}
              alt="AutoCore logo small"
              className="h-[92px] w-[92px] object-contain drop-shadow-[0_0_30px_rgba(255,30,30,0.22)]"
            />
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.45em] text-white/35">
                Brand Motion
              </p>
              <h1 className="text-5xl font-bold leading-[0.95]">
                AutoCore
                <span className="mt-2 block text-white/72">System</span>
              </h1>
            </div>
          </motion.div>

          {/* LOGIN PANEL */}
          <motion.div
            animate={panelControls}
            className="absolute right-0 top-0 z-20 flex h-full w-full items-center justify-center md:w-[56%]"
          >
            <div className="w-full max-w-[640px] px-4 md:px-8">
              <div className="rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7 shadow-[0_0_70px_rgba(255,255,255,0.03)] backdrop-blur-2xl md:p-10">
                <motion.div animate={formControls} className="mb-8">
                  <div className="mb-4 flex items-center gap-3 md:hidden">
                    <img
                      src={logo}
                      alt="AutoCore logo mobile"
                      className="h-12 w-12 object-contain"
                    />
                    <span className="text-xl font-semibold">AutoCore System</span>
                  </div>

                  <p className="mb-2 text-xs uppercase tracking-[0.38em] text-white/40">
                    Secure Access
                  </p>
                  <h2 className="text-4xl font-bold md:text-5xl">Bienvenido</h2>
                  <p className="mt-4 max-w-lg text-base leading-7 text-white/55">
                    Inicia sesión en tu sistema con una entrada visual única de
                    AutoCore.
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
        </div>
      </div>
    </div>
  );
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
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#000000_0%,#050505_16%,#170101_30%,#2d0505_48%,#130202_70%,#000000_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,0,0,0.18),transparent_18%),radial-gradient(circle_at_78%_18%,rgba(255,70,70,0.10),transparent_16%),radial-gradient(circle_at_55%_68%,rgba(255,0,0,0.10),transparent_24%),radial-gradient(circle_at_88%_82%,rgba(255,255,255,0.04),transparent_13%)]" />
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
              opacity: [p.opacity * 0.55, p.opacity, p.opacity * 0.75, p.opacity],
              scale: [1, 1.18, 1, 0.95, 1],
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