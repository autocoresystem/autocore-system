import { useState } from "react";
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

function AutoCoreLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    {
      title: "POS en la nube",
      desc: "Cobros, caja, ventas, clientes e inventario en una plataforma rápida, segura y accesible desde cualquier lugar.",
      icon: MonitorSmartphone,
    },
    {
      title: "Facturación profesional",
      desc: "Sistemas de facturación modernos para dealers, rent car, talleres, repuestos, tiendas y otros negocios.",
      icon: Receipt,
    },
    {
      title: "Reportes ejecutivos",
      desc: "Visualiza ingresos, ventas, pendientes, actividad del negocio y desempeño operativo en tiempo real.",
      icon: BarChart3,
    },
    {
      title: "Módulos personalizados",
      desc: "Diseñamos funciones según tu operación: contratos, clientes, cuentas por cobrar, cotizaciones y más.",
      icon: Settings,
    },
    {
      title: "Automatización documental",
      desc: "Genera facturas, recibos, contratos, cotizaciones y documentos con imagen profesional.",
      icon: FileText,
    },
    {
      title: "Implementación y soporte",
      desc: "Acompañamiento técnico, configuración, mejoras continuas y soporte cercano para tu equipo.",
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
    "POS y caja",
    "Facturación",
    "Clientes",
    "Inventario",
    "Cuentas por cobrar",
    "Reportes",
    "Contratos",
    "Cotizaciones",
  ];

  const plans = [
    {
      name: "Starter",
      subtitle: "Ideal para comenzar con una operación digital y organizada",
      price: "Desde $99/mes",
      features: [
        "POS básico",
        "Facturación",
        "Clientes",
        "Reportes esenciales",
        "Soporte inicial",
      ],
      highlight: false,
    },
    {
      name: "Pro",
      subtitle: "Pensado para negocios con más movimiento y necesidad de control",
      price: "Desde $199/mes",
      features: [
        "Todo lo de Starter",
        "Inventario",
        "Cuentas por cobrar",
        "Dashboard avanzado",
        "Módulos adicionales",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      subtitle: "Solución premium y personalizada para operaciones más completas",
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
      desc: "Una experiencia visual moderna que transmite nivel y profesionalismo.",
      icon: Gem,
    },
    {
      title: "Rendimiento ágil",
      desc: "Interfaz rápida para trabajar sin fricción en el día a día.",
      icon: Cpu,
    },
    {
      title: "Acceso remoto",
      desc: "Opera desde oficina, dealer, taller o celular sin perder control.",
      icon: Globe,
    },
    {
      title: "Trabajo en equipo",
      desc: "Ideal para equipos que necesitan orden, visibilidad y seguimiento.",
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

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-black text-white [font-family:Inter,ui-sans-serif,system-ui,sans-serif]">
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
                <p className="text-2xl font-black tracking-tight text-white">
                  Auto<span className="text-red-500">Core</span>
                </p>
                <p className="-mt-1 text-[11px] uppercase tracking-[0.38em] text-zinc-400">
                  System
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
                <a href="#planes" className="transition hover:text-white">
                  Planes
                </a>
                <Link to="/dashboard" className="transition hover:text-white">
                  Demo
                </Link>
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10 lg:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="border-t border-white/10 pb-4 pt-4 lg:hidden">
              <div className="flex flex-col gap-2">
                <a
                  href="#servicios"
                  onClick={closeMobileMenu}
                  className="rounded-xl px-3 py-3 text-base text-zinc-200 transition hover:bg-white/5"
                >
                  Servicios
                </a>
                <a
                  href="#modulos"
                  onClick={closeMobileMenu}
                  className="rounded-xl px-3 py-3 text-base text-zinc-200 transition hover:bg-white/5"
                >
                  Módulos
                </a>
                <a
                  href="#planes"
                  onClick={closeMobileMenu}
                  className="rounded-xl px-3 py-3 text-base text-zinc-200 transition hover:bg-white/5"
                >
                  Planes
                </a>
                <Link
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className="rounded-xl px-3 py-3 text-base text-zinc-200 transition hover:bg-white/5"
                >
                  Demo
                </Link>
                <a
                  href="#contacto"
                  onClick={closeMobileMenu}
                  className="rounded-xl px-3 py-3 text-base text-zinc-200 transition hover:bg-white/5"
                >
                  Contacto
                </a>

                <a
                  href="#contacto"
                  onClick={closeMobileMenu}
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
        <div className="absolute left-1/2 top-12 h-80 w-80 -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div {...fadeUp}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-red-200">
                <Sparkles className="h-3.5 w-3.5" />
                AutoCore System · Software premium para negocios modernos
              </div>

              <h1 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                La forma más elegante y profesional de vender, facturar y controlar tu negocio en la nube
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                AutoCore System combina diseño premium, control operativo y tecnología moderna para dealers, rent car, talleres, repuestos y negocios que quieren proyectar una imagen seria, organizada y lista para crecer.
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

            <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
              <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                <div className="relative rounded-[1.7rem] border border-white/10 bg-zinc-950 p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-zinc-400">AutoCore Executive Dashboard</p>
                      <h3 className="text-2xl font-black tracking-tight">
                        Control total del negocio en tiempo real
                      </h3>
                    </div>
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-3 py-1 text-sm font-semibold text-red-300">
                      En vivo
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {demoMetrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-4"
                      >
                        <p className="text-sm text-zinc-500">{metric.label}</p>
                        <p className="mt-2 text-3xl font-black tracking-tight">{metric.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-sm text-zinc-400">Módulos activos</p>
                      <span className="text-xs uppercase tracking-[0.2em] text-red-300">
                        Premium stack
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {modules.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
                <h3 className="text-lg font-bold tracking-tight">{item.title}</h3>
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
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
            Una presencia premium respaldada por una plataforma poderosa
          </h2>
          <p className="mt-4 text-lg leading-8 text-zinc-300">
            AutoCore no solo se ve bien. También ayuda a operar mejor, vender con más control y ofrecer una experiencia más profesional a tus clientes.
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
                <h3 className="text-xl font-bold tracking-tight">{service.title}</h3>
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
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Diseñado para negocios que necesitan control y presencia
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
              Ventajas
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Por qué AutoCore se siente como una marca premium
            </h2>
            <div className="mt-8 space-y-4">
              {[
                "Interfaz limpia, moderna y de alto nivel visual",
                "Más control sobre ventas, cobros y facturación",
                "Menos errores manuales y más organización",
                "Acceso desde oficina, negocio o celular",
                "Plataforma escalable para crecer con tus clientes",
                "Implementación adaptada a cada operación",
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
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Una arquitectura flexible para vender mejor tu solución
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-300">
              Puedes presentar AutoCore como una plataforma modular: cada cliente puede iniciar con lo esencial y luego escalar según sus necesidades.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="grid grid-cols-2 gap-4">
            {modules.map((module) => (
              <div
                key={module}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20"
              >
                <LayoutDashboard className="mb-3 h-5 w-5 text-red-500" />
                <p className="font-semibold tracking-tight text-zinc-100">{module}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="planes" className="border-y border-white/10 bg-gradient-to-b from-black to-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-300">
              Planes
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Una estructura comercial lista para vender
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-300">
              Presenta opciones claras para cerrar más clientes, desde negocios pequeños hasta operaciones que necesitan una solución completamente personalizada.
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
                <h3 className="text-2xl font-black tracking-tight">{plan.name}</h3>
                <p className="mt-2 text-zinc-400">{plan.subtitle}</p>
                <p className="mt-6 text-3xl font-black text-white">{plan.price}</p>
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
              Demo del sistema
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Una vitrina visual que ayuda a cerrar ventas
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-300">
              La demo convierte la página en una herramienta comercial real. Le muestra al cliente una experiencia moderna, limpia y bien organizada desde el primer vistazo.
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
                        <p className="mt-2 text-xl font-black tracking-tight">{metric.value}</p>
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
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
                No vendes solo un sistema: vendes orden, imagen y crecimiento
              </h2>
              <p className="mt-4 text-lg leading-8 text-zinc-300">
                AutoCore está planteado como una solución que ayuda a tus clientes a verse mejor, trabajar mejor y tomar decisiones con más claridad. Ese posicionamiento eleva el valor percibido de tu oferta.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                "Evaluación de la operación del cliente",
                "Diseño del sistema según la necesidad real",
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
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
                Haz que AutoCore se vea como una marca lista para cerrar clientes reales
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-300">
                Si quieres vender sistemas POS en la nube y plataformas de facturación con una imagen fuerte, moderna y profesional, esta página ya está planteada para ayudarte a proyectar ese nivel.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="mailto:ventas@autocoresystem.com"
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
                  <p className="mt-1 font-semibold">ventas@autocoresystem.com</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-sm text-zinc-400">WhatsApp</p>
                  <p className="mt-1 font-semibold">+1 (800) 000-0000</p>
                </div>
              </div>

              <div className="mt-8 rounded-[1.75rem] border border-red-500/15 bg-gradient-to-br from-red-600/10 to-transparent p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
                  Tabla sugerida
                </p>
                <div className="mt-4 grid gap-2 text-sm text-zinc-300 sm:grid-cols-2">
                  {[
                    "id",
                    "nombre",
                    "negocio",
                    "telefono",
                    "email",
                    "tipo_negocio",
                    "mensaje",
                    "created_at",
                  ].map((field) => (
                    <div
                      key={field}
                      className="rounded-xl border border-white/10 bg-black/30 px-3 py-2"
                    >
                      leads.{field}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  Este formulario puede conectarse luego a Supabase o a un backend en Render para guardar los prospectos automáticamente.
                </p>
              </div>
            </div>

            <div className="rounded-[2.2rem] border border-white/10 bg-white/5 p-8 shadow-[0_35px_120px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:p-10">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-300">
                    Formulario de contacto
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight">
                    Solicita información o una cotización
                  </h3>
                </div>
                <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
                  Lead form
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
                    placeholder="Cuéntanos qué tipo de sistema necesitas para tu negocio"
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
                  Esta versión ya deja el formulario listo visualmente. El siguiente paso sería conectarlo a Supabase o a tu backend en Render para guardar los leads en la tabla{" "}
                  <span className="font-semibold text-zinc-300">leads</span>.
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
