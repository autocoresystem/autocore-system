import { motion } from "framer-motion";
import {
  ArrowLeft,
  LayoutDashboard,
  Users,
  Receipt,
  CarFront,
  Wallet,
  Clock3,
  FileText,
  Bell,
  CheckCircle2,
  Wrench,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    { title: "Ingresos del mes", value: "$84,240", sub: "+12.4% vs mes pasado", icon: Wallet },
    { title: "Clientes activos", value: "318", sub: "27 nuevos esta semana", icon: Users },
    { title: "Vehículos activos", value: "46", sub: "8 en proceso de entrega", icon: CarFront },
    { title: "Facturas emitidas", value: "1,284", sub: "98 pendientes de pago", icon: Receipt },
  ];

  const recentActivity = [
    { title: "Factura #1048 generada", status: "Completado" },
    { title: "Nuevo cliente registrado", status: "Listo" },
    { title: "Contrato enviado para firma", status: "Pendiente" },
    { title: "Pago recibido de Auto Dealer Pro", status: "Confirmado" },
  ];

  const quickModules = [
    { title: "Clientes", desc: "Gestión de clientes, contactos e historial.", icon: Users },
    { title: "Facturación", desc: "Facturas, recibos y cuentas por cobrar.", icon: Receipt },
    { title: "Vehículos", desc: "Control de unidades disponibles y activas.", icon: CarFront },
    { title: "Taller", desc: "Seguimiento de mantenimiento y servicios.", icon: Wrench },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.12),transparent_18%),radial-gradient(circle_at_left,rgba(255,255,255,0.05),transparent_20%),radial-gradient(circle_at_bottom,rgba(120,120,120,0.06),transparent_24%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <LayoutDashboard className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-xl font-black tracking-tight">
                Auto<span className="text-red-500">Core</span>
              </p>
              <p className="-mt-1 text-[11px] uppercase tracking-[0.3em] text-zinc-400">
                Demo Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al menú
            </a>

            <button className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
              <Bell className="h-4 w-4 text-zinc-300" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-300">
                  Panel ejecutivo
                </p>
                <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                  Vista premium del sistema
                </h1>
                <p className="mt-3 max-w-2xl text-zinc-300">
                  Una demostración pensada para enseñar orden, control y presencia profesional
                  a clientes de dealers, rent car, talleres y negocios modernos.
                </p>
              </div>

              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300">
                Demo comercial
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -3, scale: 1.01 }}
                    className="rounded-[1.5rem] border border-white/10 bg-zinc-950/80 p-5 shadow-2xl shadow-black/20"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                      <Icon className="h-5 w-5 text-red-500" />
                    </div>
                    <p className="text-sm text-zinc-400">{item.title}</p>
                    <p className="mt-2 text-3xl font-black tracking-tight">{item.value}</p>
                    <p className="mt-2 text-sm text-zinc-500">{item.sub}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-zinc-950/80 p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">Actividad reciente</p>
                  <h2 className="text-xl font-bold tracking-tight">Movimientos del sistema</h2>
                </div>
                <Clock3 className="h-5 w-5 text-red-400" />
              </div>

              <div className="space-y-3">
                {recentActivity.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-red-500" />
                      <span className="text-zinc-200">{item.title}</span>
                    </div>
                    <span className="text-sm font-medium text-zinc-400">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">Módulos destacados</p>
                  <h2 className="text-xl font-bold tracking-tight">Áreas del sistema</h2>
                </div>
                <FileText className="h-5 w-5 text-red-500" />
              </div>

              <div className="grid gap-4">
                {quickModules.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      whileHover={{ x: 3 }}
                      className="rounded-[1.4rem] border border-white/10 bg-zinc-950/80 p-4"
                    >
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                        <Icon className="h-5 w-5 text-red-500" />
                      </div>
                      <p className="font-semibold tracking-tight text-white">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-zinc-400">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-red-600/10 via-black to-zinc-500/10 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
                Presentación comercial
              </p>
              <h3 className="mt-3 text-2xl font-black tracking-tight">
                Este demo ya proyecta una imagen de producto serio
              </h3>
              <p className="mt-3 leading-7 text-zinc-300">
                Puedes usar esta vista para mostrar a un cliente cómo se vería su operación
                digital: ingresos, clientes, vehículos, facturación y actividad del negocio en
                una sola experiencia visual.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="/"
                  className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:scale-[1.01]"
                >
                  Volver a la landing
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Solicitar demo personalizada
                </a>
              </div>
            </motion.div>
          </section>
        </motion.div>
      </main>
    </div>
  );
}