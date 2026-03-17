import { useEffect, useRef, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import { motion } from "framer-motion";
import {
  MonitorSmartphone,
  FileText,
  BarChart3,
  Settings,
  ShieldCheck,
  Building2,
  CheckCircle2,
  BadgeDollarSign,
  LayoutDashboard,
  MessageCircle,
  ChevronRight,
  Receipt,
  Boxes,
  Wrench,
  CarFront,
  Store,
  Briefcase,
  Sparkles,
  ArrowRight,
  Layers3,
  Clock3,
  Lock,
  Cpu,
  Globe,
  Users,
  Gem,
  Menu,
  X,
} from "lucide-react";

function FontLoader() {
  useEffect(() => {
    const preconnect1 = document.createElement("link");
    preconnect1.rel = "preconnect";
    preconnect1.href = "https://fonts.googleapis.com";

    const preconnect2 = document.createElement("link");
    preconnect2.rel = "preconnect";
    preconnect2.href = "https://fonts.gstatic.com";
    preconnect2.crossOrigin = "anonymous";

    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap";

    document.head.appendChild(preconnect1);
    document.head.appendChild(preconnect2);
    document.head.appendChild(fontLink);

    return () => {
      document.head.removeChild(preconnect1);
      document.head.removeChild(preconnect2);
      document.head.removeChild(fontLink);
    };
  }, []);

  return null;
}

function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 95 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.8,
      dx: (Math.random() - 0.5) * 0.22,
      dy: (Math.random() - 0.5) * 0.22,
      a: Math.random() * 0.5 + 0.12,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(255,255,255,0.14)";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
    />
  );
}

function HeroParticleText() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let time = 0;

    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

    const buildParticles = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.floor(rect.width || 0);
      const height = Math.floor(rect.height || 0);

      if (!width || !height) return;

      const isMobile = width < 640;

      canvas.width = width * DPR;
      canvas.height = height * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const offCtx = off.getContext("2d");

      offCtx.clearRect(0, 0, width, height);
      offCtx.fillStyle = "#ffffff";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";

      const fontSize = isMobile
        ? Math.min(width * 0.12, 54)
        : Math.min(width * 0.1, 120);

      offCtx.font = `800 ${fontSize}px "Plus Jakarta Sans", Arial, sans-serif`;
      offCtx.fillText("AutoCore Systems", width / 2, height / 2);

      const imageData = offCtx.getImageData(0, 0, width, height).data;

      const gap = isMobile
        ? Math.max(6, Math.floor(width / 90))
        : Math.max(5, Math.floor(width / 220));

      const spreadX = isMobile ? 90 : 220;
      const spreadY = isMobile ? 45 : 100;

      particles = [];

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          if (imageData[index + 3] > 90) {
            particles.push({
              tx: x,
              ty: y,
              sx: x + (Math.random() - 0.5) * spreadX,
              sy: y + (Math.random() - 0.5) * spreadY,
              driftX: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.9),
              driftY: (Math.random() - 0.5) * (isMobile ? 0.22 : 0.5),
              size: isMobile
                ? Math.random() * 1.1 + 0.6
                : Math.random() * 1.6 + 0.7,
              alpha: Math.random() * 0.35 + 0.45,
            });
          }
        }
      }
    };

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.floor(rect.width || 0);
      const height = Math.floor(rect.height || 0);
      if (!width || !height) return;

      const isMobile = width < 640;

      ctx.clearRect(0, 0, width, height);

      time += 0.016;

      const introDuration = isMobile ? 1.4 : 2.2;
      const introT = Math.min(time / introDuration, 1);
      const compact = easeOutCubic(introT);
      const breathe = Math.sin(time * (isMobile ? 1.1 : 1.4)) * 0.5 + 0.5;

      for (const p of particles) {
        const baseX = p.sx * (1 - compact) + p.tx * compact;
        const baseY = p.sy * (1 - compact) + p.ty * compact;

        const px =
          baseX +
          Math.sin(time * 1.1 + p.tx * 0.01) *
            p.driftX *
            (isMobile ? 2 : 2 + breathe * 4);

        const py =
          baseY +
          Math.cos(time * 1.05 + p.ty * 0.01) *
            p.driftY *
            (isMobile ? 2 : 2 + breathe * 4);

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.shadowBlur = isMobile ? 6 : 10;
        ctx.shadowColor = "rgba(255,255,255,0.16)";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      time = 0;
      buildParticles();
    };

    buildParticles();
    draw();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 mx-auto h-28 w-[16rem] max-w-full rounded-full bg-red-600/10 blur-3xl sm:h-40 sm:w-[34rem] lg:h-64" />
      <canvas
        ref={canvasRef}
        className="relative z-10 block h-[170px] w-full sm:h-[260px] lg:h-[420px]"
      />
    </div>
  );
}

function AutoCoreLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    {
      title: "Facturación profesional",
      desc: "Emite facturas claras, organizadas y listas para compartir con tus clientes, proyectando una imagen mucho más seria y moderna.",
      icon: Receipt,
    },
    {
      title: "Sistema POS en la nube",
      desc: "Administra ventas, caja, movimientos y operaciones desde una plataforma segura, rápida y accesible desde cualquier lugar.",
      icon: MonitorSmartphone,
    },
    {
      title: "Control de inventario",
      desc: "Mantén tus productos, repuestos, unidades o servicios bajo control con información actualizada y mejor visibilidad operativa.",
      icon: Boxes,
    },
    {
      title: "Gestión de clientes",
      desc: "Organiza la información de tus clientes, historial, contacto y seguimiento en un solo lugar para trabajar con más orden.",
      icon: Users,
    },
    {
      title: "Reportes y métricas",
      desc: "Visualiza ingresos, desempeño, ventas, cobros pendientes y actividad del negocio con reportes útiles para tomar decisiones.",
      icon: BarChart3,
    },
    {
      title: "Implementación y soporte",
      desc: "Te acompañamos en la configuración, adaptación del sistema y mejoras necesarias para que tu negocio opere con confianza.",
      icon: ShieldCheck,
    },
  ];

  const industries = [
    { name: "Dealers y auto sales", icon: CarFront },
    { name: "Rent Car", icon: Building2 },
    { name: "Talleres mecánicos", icon: Wrench },
    { name: "Tiendas de repuestos", icon: Boxes },
    { name: "Negocios de servicios", icon: Briefcase },
    { name: "Pequeñas y medianas empresas", icon: Store },
  ];

  const modules = [
    {
      title: "POS y caja",
      desc: "Controla ventas, cobros y movimientos diarios con mayor rapidez.",
    },
    {
      title: "Facturación",
      desc: "Genera facturas profesionales con una experiencia más moderna.",
    },
    {
      title: "Clientes",
      desc: "Mantén cada cliente organizado y accesible en un solo sistema.",
    },
    {
      title: "Inventario",
      desc: "Gestiona existencias, productos y unidades con más precisión.",
    },
    {
      title: "Cuentas por cobrar",
      desc: "Lleva seguimiento de pagos pendientes y mejora tu control financiero.",
    },
    {
      title: "Reportes",
      desc: "Consulta métricas clave del negocio para tomar mejores decisiones.",
    },
    {
      title: "Contratos",
      desc: "Centraliza documentos importantes con un formato más profesional.",
    },
    {
      title: "Cotizaciones",
      desc: "Prepara propuestas claras y bien presentadas para tus clientes.",
    },
  ];

  const plans = [
    {
      name: "Esencial",
      subtitle: "Ideal para negocios que quieren comenzar a digitalizar su operación",
      price: "Desde $99/mes",
      features: [
        "Facturación",
        "Clientes",
        "POS básico",
        "Reportes esenciales",
        "Soporte inicial",
      ],
      highlight: false,
    },
    {
      name: "Profesional",
      subtitle: "Para negocios que necesitan más control y una operación más completa",
      price: "Desde $199/mes",
      features: [
        "Todo lo del plan Esencial",
        "Inventario",
        "Cuentas por cobrar",
        "Dashboard más completo",
        "Módulos adicionales",
      ],
      highlight: true,
    },
    {
      name: "Premium",
      subtitle: "Solución personalizada para empresas con necesidades más robustas",
      price: "Cotización personalizada",
      features: [
        "Sistema a la medida",
        "Automatizaciones",
        "Usuarios múltiples",
        "Documentos personalizados",
        "Soporte prioritario",
      ],
      highlight: false,
    },
  ];

  const premiumPoints = [
    {
      title: "Diseño premium",
      desc: "Una presencia visual moderna que eleva la percepción de tu negocio.",
      icon: Gem,
    },
    {
      title: "Operación ágil",
      desc: "Interfaz rápida y funcional para trabajar sin fricción cada día.",
      icon: Cpu,
    },
    {
      title: "Acceso remoto",
      desc: "Consulta y administra tu operación desde oficina, negocio o celular.",
      icon: Globe,
    },
    {
      title: "Trabajo en equipo",
      desc: "Ideal para equipos que necesitan orden, control y seguimiento.",
      icon: Users,
    },
  ];

  const demoMetrics = [
    { label: "Ventas mensuales", value: "$84,240" },
    { label: "Facturas emitidas", value: "1,284" },
    { label: "Clientes activos", value: "318" },
    { label: "Cobros pendientes", value: "12" },
  ];

  const businessTypes = [
    "Dealer / Auto Sales",
    "Rent Car",
    "Taller mecánico",
    "Tienda de repuestos",
    "Negocio de servicios",
    "Otro",
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 },
  };

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: '"Manrope", ui-sans-serif, system-ui, sans-serif' }}
    >
      <FontLoader />
      <ParticleBackground />

      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.14),transparent_18%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(120,120,120,0.08),transparent_22%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[72px] items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/autocore-logo.png"
                alt="AutoCore"
                className="h-11 w-auto drop-shadow-[0_0_20px_rgba(255,0,0,0.6)]"
              />
              <div>
                <p
                  className="text-2xl font-extrabold tracking-tight text-white"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                  Auto<span className="text-red-500">Core</span>
                </p>
                <p className="-mt-1 text-[11px] uppercase tracking-[0.38em] text-zinc-400">
                  Systems
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-8 lg:flex">
              <nav className="flex items-center gap-8 text-sm text-zinc-300">
                <a href="#servicios" className="transition hover:text-white">
                  Servicios
                </a>
                <a href="#modulos" className="transition hover:text-white">
                  Módulos
                </a>
                <a href="#nosotros" className="transition hover:text-white">
                  Nosotros
                </a>
                <a href="#planes" className="transition hover:text-white">
                  Planes
                </a>
                <a href="#contacto" className="transition hover:text-white">
                  Contacto
                </a>
              </nav>

              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(255,0,0,0.18)] transition hover:scale-[1.02]"
              >
                Solicitar cotización
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10 lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="border-t border-white/10 pb-4 pt-4 lg:hidden">
              <div className="flex flex-col gap-2">
                <a href="#servicios" className="rounded-xl px-3 py-3 text-base text-zinc-200 hover:bg-white/5">
                  Servicios
                </a>
                <a href="#modulos" className="rounded-xl px-3 py-3 text-base text-zinc-200 hover:bg-white/5">
                  Módulos
                </a>
                <a href="#nosotros" className="rounded-xl px-3 py-3 text-base text-zinc-200 hover:bg-white/5">
                  Nosotros
                </a>
                <a href="#planes" className="rounded-xl px-3 py-3 text-base text-zinc-200 hover:bg-white/5">
                  Planes
                </a>
                <a href="#contacto" className="rounded-xl px-3 py-3 text-base text-zinc-200 hover:bg-white/5">
                  Contacto
                </a>
                <a
                  href="#contacto"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-3 font-semibold text-white"
                >
                  Solicitar cotización
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_28%)]" />
        <div className="absolute left-1/2 top-16 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
          <motion.div {...fadeUp} className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-red-200">
              <Sparkles className="h-3.5 w-3.5" />
              AutoCore Systems · Plataforma premium para negocios modernos
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="relative z-10">
            <div className="relative py-2 sm:py-4 lg:py-6">
              <HeroParticleText />
            </div>
            <p className="mt-1 px-2 text-center text-[10px] uppercase tracking-[0.28em] text-zinc-400 sm:text-sm sm:tracking-[0.38em]">
              Cloud POS · Facturación · Gestión · Control operativo
            </p>
          </motion.div>

          <div className="relative z-10 mt-10 grid items-start gap-14 lg:grid-cols-[1.02fr_0.98fr]">
            <motion.div {...fadeUp}>
              <h1
                className="max-w-4xl text-4xl font-extrabold leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                Control total para tu negocio, con una imagen más moderna y profesional
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                AutoCore Systems reúne facturación, clientes, inventario, reportes y control operativo en una sola plataforma diseñada para negocios que quieren trabajar con más orden, rapidez y presencia profesional.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-3.5 text-center font-semibold shadow-[0_18px_60px_rgba(255,0,0,0.22)] transition hover:scale-[1.02]"
                >
                  Solicitar cotización
                  <ArrowRight className="h-4 w-4" />
                </a>

                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-center font-semibold text-zinc-100 transition hover:bg-white/10"
                >
                  Ver demo del sistema
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { title: "Seguridad", subtitle: "Operación protegida", icon: Lock },
                  { title: "Rapidez", subtitle: "Flujo optimizado", icon: Clock3 },
                  { title: "Escalabilidad", subtitle: "Listo para crecer", icon: Layers3 },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl"
                    >
                      <Icon className="mb-3 h-5 w-5 text-red-500" />
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-zinc-400">{item.subtitle}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div {...fadeUp}>
              <div className="rounded-[2rem] border border-white/10 bg-black/60 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-zinc-400">Vista ejecutiva</p>
                  <span className="text-xs uppercase tracking-[0.2em] text-red-300">
                    PREMIUM UI
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {demoMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-4"
                    >
                      <p className="text-sm text-zinc-500">{metric.label}</p>
                      <p
                        className="mt-2 text-3xl font-extrabold tracking-tight"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                      >
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-zinc-400">Módulos incluidos</p>
                    <span className="text-xs uppercase tracking-[0.2em] text-red-300">
                      AutoCore Stack
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {modules.map((tag) => (
                      <span
                        key={tag.title}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-200"
                      >
                        {tag.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <motion.div {...fadeUp} className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {premiumPoints.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-800 to-black">
                  <Icon className="h-5 w-5 text-red-500" />
                </div>
                <h3
                  className="text-lg font-extrabold tracking-tight"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                  {item.title}
                </h3>
                <p className="mt-2 text-zinc-400">{item.desc}</p>
              </div>
            );
          })}
        </motion.div>
      </section>

      <section id="servicios" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <motion.div {...fadeUp} className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-red-300">
            Servicios
          </p>
          <h2
            className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            Soluciones pensadas para operar mejor y proyectar una imagen más sólida
          </h2>
          <p className="mt-4 text-lg leading-8 text-zinc-300">
            AutoCore Systems ayuda a modernizar la operación de tu negocio con herramientas diseñadas para facturar, organizar, controlar y crecer con más eficiencia.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group rounded-[1.9rem] border border-white/10 bg-white/5 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.07]"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-800 to-black shadow-inner">
                  <Icon className="h-6 w-6 text-red-500" />
                </div>
                <h3
                  className="text-xl font-extrabold tracking-tight"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                  {service.title}
                </h3>
                <p className="mt-3 leading-7 text-zinc-300">{service.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8">
          <motion.div {...fadeUp}>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-300">
              Sectores ideales
            </p>
            <h2
              className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Diseñado para negocios que necesitan más control y mejor presentación
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {industries.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className="rounded-2xl border border-white/10 bg-zinc-950/80 p-4 text-zinc-200 shadow-xl shadow-black/20"
                  >
                    <Icon className="mb-3 h-5 w-5 text-red-500" />
                    <p className="font-medium">{item.name}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div {...fadeUp}>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-300">
              Beneficios
            </p>
            <h2
              className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Una plataforma creada para ordenar, agilizar y fortalecer tu operación
            </h2>
            <div className="mt-8 space-y-4">
              {[
                "Interfaz moderna, limpia y de alto nivel visual",
                "Más control sobre ventas, cobros y facturación",
                "Menos errores manuales y mejor organización",
                "Acceso desde oficina, negocio o celular",
                "Solución escalable para acompañar el crecimiento del negocio",
                "Implementación adaptada a cada tipo de operación",
              ].map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-zinc-950/80 p-4 shadow-xl shadow-black/20"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-red-500" />
                  <p className="text-zinc-200">{benefit}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="modulos" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div {...fadeUp}>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-300">
              Módulos del sistema
            </p>
            <h2
              className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Todo lo que necesitas para administrar tu negocio en una sola plataforma
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-300">
              AutoCore Systems puede adaptarse a la operación de cada empresa, integrando módulos clave para facturación, seguimiento, control y gestión diaria.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {modules.map((module) => (
              <div
                key={module.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20"
              >
                <LayoutDashboard className="mb-3 h-5 w-5 text-red-500" />
                <p
                  className="font-extrabold tracking-tight text-zinc-100"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                  {module.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-zinc-400">{module.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="nosotros" className="border-y border-white/10 bg-gradient-to-b from-zinc-950 to-black">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <motion.div {...fadeUp}>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-300">
                Quiénes somos
              </p>
              <h2
                className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                Tecnología, diseño y funcionalidad para negocios que quieren crecer
              </h2>
            </motion.div>

            <motion.div {...fadeUp} className="space-y-5 text-lg leading-8 text-zinc-300">
              <p>
                En AutoCore Systems ayudamos a negocios a modernizar su operación con herramientas digitales diseñadas para ofrecer más control, mejor organización y una imagen más profesional frente a sus clientes.
              </p>
              <p>
                Creamos soluciones prácticas para empresas que necesitan centralizar facturación, clientes, inventario, cobros, reportes y procesos operativos en un solo lugar.
              </p>
              <p>
                Nuestro enfoque combina diseño moderno, experiencia de usuario y funcionalidad real para construir plataformas que no solo se vean bien, sino que también ayuden a trabajar mejor cada día.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="planes" className="border-y border-white/10 bg-gradient-to-b from-black to-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-300">
              Planes
            </p>
            <h2
              className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Planes pensados para diferentes etapas de crecimiento
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-300">
              Desde negocios que están comenzando a digitalizarse hasta operaciones que necesitan una solución más robusta y personalizada.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className={`rounded-[2rem] border p-7 shadow-[0_30px_100px_rgba(0,0,0,0.3)] transition hover:-translate-y-1 ${
                  plan.highlight
                    ? "border-red-500/40 bg-white/[0.07] shadow-[0_30px_100px_rgba(255,0,0,0.08)]"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {plan.highlight && (
                  <div className="mb-4 inline-flex rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white">
                    Más popular
                  </div>
                )}
                <h3
                  className="text-2xl font-extrabold tracking-tight"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                  {plan.name}
                </h3>
                <p className="mt-2 text-zinc-400">{plan.subtitle}</p>
                <p
                  className="mt-6 text-3xl font-extrabold text-white"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                  {plan.price}
                </p>
                <div className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <ChevronRight className="mt-0.5 h-4 w-4 text-red-500" />
                      <span className="text-zinc-200">{feature}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="#contacto"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 font-semibold transition ${
                    plan.highlight
                      ? "bg-red-600 text-white hover:scale-[1.02]"
                      : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  Solicitar información
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div {...fadeUp}>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-300">
              Vista previa
            </p>
            <h2
              className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Una experiencia visual moderna desde el primer vistazo
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-300">
              AutoCore Systems está diseñado para ofrecer una experiencia limpia, clara y profesional, ayudando a que la gestión del negocio se sienta más organizada y eficiente.
            </p>
            <div className="mt-8 space-y-4">
              {[
                "Dashboard ejecutivo con información clave del negocio",
                "Flujo de facturación rápido y profesional",
                "Gestión de clientes y cuentas pendientes",
                "Inventario y reportes con mejor visibilidad",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/20"
                >
                  <BadgeDollarSign className="mt-0.5 h-5 w-5 text-red-500" />
                  <p className="text-zinc-200">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp}>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_35px_120px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
              <div className="rounded-[1.7rem] border border-white/10 bg-zinc-950 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-sm text-zinc-400">Vista demo</p>
                  <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
                    Premium UI
                  </span>
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {demoMetrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-2xl border border-white/10 bg-black p-4"
                      >
                        <p className="text-xs text-zinc-500">{metric.label}</p>
                        <p
                          className="mt-2 text-xl font-extrabold tracking-tight"
                          style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                        >
                          {metric.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black p-5">
                    <p className="mb-4 text-sm text-zinc-400">Actividad reciente</p>
                    <div className="space-y-3">
                      {[
                        "Factura generada",
                        "Cliente registrado",
                        "Pago recibido",
                        "Reporte actualizado",
                      ].map((row) => (
                        <div
                          key={row}
                          className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3"
                        >
                          <span className="text-zinc-200">{row}</span>
                          <span className="text-sm font-medium text-red-300">Listo</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                  >
                    Abrir demo completa
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <motion.div
          {...fadeUp}
          className="rounded-[2.2rem] border border-white/10 bg-gradient-to-br from-red-600/10 via-black to-zinc-500/10 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.35)] lg:p-12"
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-300">
                Por qué elegir AutoCore
              </p>
              <h2
                className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                Más que un sistema: una herramienta para ordenar y fortalecer tu negocio
              </h2>
              <p className="mt-4 text-lg leading-8 text-zinc-300">
                AutoCore Systems está pensado para ayudar a las empresas a trabajar con más claridad, proyectar una imagen más profesional y tener mejor control de su operación diaria.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                "Evaluación de la operación del negocio",
                "Definición de módulos y necesidades",
                "Implementación y configuración profesional",
                "Capacitación, acompañamiento y mejoras",
              ].map((step, i) => (
                <div
                  key={step}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5 shadow-xl shadow-black/20"
                >
                  <p className="text-sm text-zinc-400">Paso {i + 1}</p>
                  <p className="mt-1 text-lg font-semibold">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section id="contacto" className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div {...fadeUp} className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2.2rem] border border-white/10 bg-white/5 p-8 shadow-[0_35px_120px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-300">
                Contacto
              </p>
              <h2
                className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                Solicita información y descubre cómo AutoCore puede adaptarse a tu negocio
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-300">
                Estamos listos para ayudarte a implementar una solución moderna, profesional y funcional que se ajuste a la operación real de tu empresa.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="mailto:autocoresystem@gmail.com"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-3.5 font-semibold transition hover:scale-[1.02]"
                >
                  <FileText className="h-4 w-4" />
                  Escribir por email
                </a>
                <a
                  href="https://wa.me/18000000000"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold transition hover:bg-white/10"
                >
                  <MessageCircle className="h-4 w-4" />
                  Contactar por WhatsApp
                </a>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-sm text-zinc-400">Correo</p>
                  <p className="mt-1 font-semibold">autocoresystem@gmail.com</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-sm text-zinc-400">WhatsApp</p>
                  <p className="mt-1 font-semibold">+1 (800) 000-0000</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2.2rem] border border-white/10 bg-white/5 p-8 shadow-[0_35px_120px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:p-10">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-300">
                    Formulario de contacto
                  </p>
                  <h3
                    className="mt-2 text-2xl font-extrabold tracking-tight"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                  >
                    Solicita información o una cotización
                  </h3>
                </div>
                <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
                  Contacto
                </span>
              </div>

              <form className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                      Nombre
                    </label>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500/40"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                      Negocio
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre del negocio"
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500/40"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      placeholder="Tu teléfono"
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500/40"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="tuemail@negocio.com"
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Tipo de negocio
                  </label>
                  <select className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-red-500/40">
                    <option value="">Selecciona una opción</option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type} className="bg-zinc-950">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Mensaje
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Cuéntanos qué tipo de solución necesitas para tu negocio"
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500/40"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-3.5 font-semibold text-white shadow-[0_18px_60px_rgba(255,0,0,0.22)] transition hover:scale-[1.01]"
                >
                  Enviar solicitud
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-sm leading-7 text-zinc-400">
                  Completa el formulario y nuestro equipo te contactará para orientarte sobre la mejor opción para tu negocio.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AutoCoreLandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}