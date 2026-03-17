import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
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
  Search,
  Filter,
  CalendarDays,
  CreditCard,
  Package,
  BarChart3,
  Settings,
  Building2,
  MessageCircle,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  Plus,
  UserPlus,
  ClipboardList,
  BadgeDollarSign,
  Lock,
  Eye,
  EyeOff,
  LineChart,
  TrendingUp,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart as ReLineChart,
  Line,
} from 'recharts';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [search, setSearch] = useState('');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const stats = [
    { title: 'Ingresos del mes', value: '$84,240', sub: '+12.4% vs mes pasado', icon: Wallet },
    { title: 'Clientes activos', value: '318', sub: '27 nuevos esta semana', icon: Users },
    { title: 'Vehículos activos', value: '46', sub: '8 en proceso de entrega', icon: CarFront },
    { title: 'Facturas emitidas', value: '1,284', sub: '98 pendientes de pago', icon: Receipt },
  ];

  const recentActivity = [
    { title: 'Factura #1048 generada', status: 'Completado', time: 'Hace 5 min' },
    { title: 'Nuevo cliente registrado', status: 'Listo', time: 'Hace 14 min' },
    { title: 'Contrato enviado para firma', status: 'Pendiente', time: 'Hace 25 min' },
    { title: 'Pago recibido de Auto Dealer Pro', status: 'Confirmado', time: 'Hace 40 min' },
  ];

  const clients = [
    { name: 'Auto Dealer Pro', contact: 'Carlos Mendez', type: 'Dealer', balance: '$3,240', status: 'Activo' },
    { name: 'Premium Rent Solutions', contact: 'Maria Lopez', type: 'Rent Car', balance: '$1,120', status: 'Al día' },
    { name: 'Taller Rivera', contact: 'Luis Rivera', type: 'Taller', balance: '$890', status: 'Pendiente' },
    { name: 'North Parts Supply', contact: 'Ana Gomez', type: 'Repuestos', balance: '$0', status: 'Al día' },
    { name: 'Elite Motors Group', contact: 'José Cabrera', type: 'Dealer', balance: '$4,810', status: 'Activo' },
  ];

  const invoices = [
    { id: '#1048', client: 'Auto Dealer Pro', amount: '$1,450', due: 'Hoy', status: 'Pendiente' },
    { id: '#1047', client: 'Premium Rent Solutions', amount: '$980', due: 'Pagada', status: 'Pagada' },
    { id: '#1046', client: 'Taller Rivera', amount: '$520', due: 'Mañana', status: 'Pendiente' },
    { id: '#1045', client: 'North Parts Supply', amount: '$2,100', due: 'Pagada', status: 'Pagada' },
    { id: '#1044', client: 'Elite Motors Group', amount: '$3,680', due: 'Vence en 2 días', status: 'Pendiente' },
  ];

  const vehicles = [
    { unit: 'Toyota Corolla 2022', plate: 'A9214', status: 'Disponible', type: 'Rent Car' },
    { unit: 'Honda CR-V 2021', plate: 'B1920', status: 'En renta', type: 'Rent Car' },
    { unit: 'Kia K5 2023', plate: 'C5518', status: 'Mantenimiento', type: 'Dealer' },
    { unit: 'Hyundai Elantra 2020', plate: 'D8821', status: 'Disponible', type: 'Dealer' },
    { unit: 'Ford Escape 2022', plate: 'E0029', status: 'Reservado', type: 'Rent Car' },
    { unit: 'Nissan Sentra 2021', plate: 'F7711', status: 'En inspección', type: 'Dealer' },
  ];

  const workshopJobs = [
    { ticket: 'OT-2201', unit: 'Honda CR-V 2021', service: 'Cambio de aceite', tech: 'Miguel', status: 'En proceso' },
    { ticket: 'OT-2202', unit: 'Toyota Corolla 2022', service: 'Frenos delanteros', tech: 'Andres', status: 'Pendiente' },
    { ticket: 'OT-2203', unit: 'Kia K5 2023', service: 'Diagnóstico eléctrico', tech: 'Jose', status: 'Completado' },
    { ticket: 'OT-2204', unit: 'Ford Escape 2022', service: 'Alineación y balanceo', tech: 'Daniel', status: 'Programado' },
  ];

  const reportCards = [
    { title: 'Ventas por canal', value: '$38,200', sub: 'Dealer, rent car y taller', icon: BarChart3 },
    { title: 'Cuentas por cobrar', value: '$12,480', sub: '17 facturas pendientes', icon: CreditCard },
    { title: 'Inventario de repuestos', value: '284', sub: 'Piezas registradas', icon: Package },
    { title: 'Alertas del sistema', value: '6', sub: '2 requieren atención hoy', icon: AlertTriangle },
  ];

  const salesChartData = [
    { name: 'Lun', ventas: 4200 },
    { name: 'Mar', ventas: 5100 },
    { name: 'Mié', ventas: 4700 },
    { name: 'Jue', ventas: 6200 },
    { name: 'Vie', ventas: 7100 },
    { name: 'Sáb', ventas: 6800 },
    { name: 'Dom', ventas: 5300 },
  ];

  const performanceData = [
    { name: 'Ene', valor: 38 },
    { name: 'Feb', valor: 44 },
    { name: 'Mar', valor: 41 },
    { name: 'Abr', valor: 57 },
    { name: 'May', valor: 63 },
    { name: 'Jun', valor: 72 },
  ];

  const menu = [
    { key: 'overview', label: 'Resumen', icon: LayoutDashboard },
    { key: 'clients', label: 'Clientes', icon: Users },
    { key: 'billing', label: 'Facturación', icon: Receipt },
    { key: 'vehicles', label: 'Vehículos', icon: CarFront },
    { key: 'workshop', label: 'Taller', icon: Wrench },
    { key: 'reports', label: 'Reportes', icon: BarChart3 },
  ];

  const filteredClients = useMemo(() => {
    return clients.filter((client) =>
      `${client.name} ${client.contact} ${client.type} ${client.status}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [clients, search]);

  const fadeUp = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45 },
  };

  const statusColor = (status) => {
    if (['Pagada', 'Completado', 'Activo', 'Al día', 'Disponible', 'Confirmado', 'Listo'].includes(status)) return 'text-emerald-300';
    if (['Pendiente', 'Mantenimiento', 'Programado', 'Reservado', 'En proceso', 'En inspección'].includes(status)) return 'text-amber-300';
    return 'text-red-300';
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.title} whileHover={{ y: -3, scale: 1.01 }} className="rounded-[1.5rem] border border-white/10 bg-zinc-950/80 p-5 shadow-2xl shadow-black/20">
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

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950/80 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Actividad reciente</p>
              <h2 className="text-xl font-bold tracking-tight">Movimientos del sistema</h2>
            </div>
            <Clock3 className="h-5 w-5 text-red-400" />
          </div>
          <div className="space-y-3">
            {recentActivity.map((item) => (
              <div key={item.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-zinc-200">{item.title}</p>
                    <p className="text-xs text-zinc-500">{item.time}</p>
                  </div>
                </div>
                <span className={`text-sm font-medium ${statusColor(item.status)}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950/80 p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">Resumen operativo</p>
                <h2 className="text-xl font-bold tracking-tight">Estado del día</h2>
              </div>
              <ShieldCheck className="h-5 w-5 text-red-500" />
            </div>
            <div className="space-y-4">
              {[
                ['Cobros recibidos hoy', '$4,820'],
                ['Contratos pendientes', '12'],
                ['Vehículos en servicio', '8'],
                ['Alertas activas', '2'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm text-zinc-500">{label}</p>
                  <p className="mt-2 text-2xl font-black tracking-tight">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-red-600/10 via-black to-zinc-500/10 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">Novedad</p>
            <h3 className="mt-2 text-xl font-black tracking-tight">Experiencia más real dentro del demo</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-300">
              Ahora incluye navegación lateral, login demo, facturación simulada, calendario, buscador de clientes y gráficos premium para que el sistema se sienta más vivo.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950/80 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Ventas semanales</p>
              <h2 className="text-xl font-bold tracking-tight">Gráfico comercial</h2>
            </div>
            <BarChart3 className="h-5 w-5 text-red-500" />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip contentStyle={{ background: '#09090b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} />
                <Bar dataKey="ventas" fill="#dc2626" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950/80 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Crecimiento</p>
              <h2 className="text-xl font-bold tracking-tight">Tendencia mensual</h2>
            </div>
            <TrendingUp className="h-5 w-5 text-red-500" />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ReLineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip contentStyle={{ background: '#09090b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} />
                <Line type="monotone" dataKey="valor" stroke="#dc2626" strokeWidth={3} dot={{ r: 4, fill: '#dc2626' }} />
              </ReLineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClients = () => (
    <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950/80 p-6">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-zinc-400">CRM comercial</p>
          <h2 className="text-xl font-bold tracking-tight">Base de clientes</h2>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar cliente" className="rounded-2xl border border-white/10 bg-black/40 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-500" />
          </div>
          <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white">
            <UserPlus className="h-4 w-4" /> Nuevo
          </button>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <div className="grid grid-cols-5 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-zinc-400">
          <span>Negocio</span><span>Contacto</span><span>Tipo</span><span>Balance</span><span>Estado</span>
        </div>
        {filteredClients.map((client) => (
          <div key={client.name} className="grid grid-cols-5 border-t border-white/10 px-4 py-4 text-sm text-zinc-200">
            <span className="font-medium">{client.name}</span><span>{client.contact}</span><span>{client.type}</span><span>{client.balance}</span><span className={statusColor(client.status)}>{client.status}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
      <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950/80 p-6">
        <div className="mb-5 flex items-center justify-between">
          <div><p className="text-sm text-zinc-400">Facturación</p><h2 className="text-xl font-bold tracking-tight">Facturas recientes</h2></div>
          <button onClick={() => setShowInvoiceModal(true)} className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white"><Plus className="h-4 w-4" /> Nueva factura</button>
        </div>
        <div className="space-y-3">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between">
                <div><p className="font-semibold text-white">{invoice.id} · {invoice.client}</p><p className="mt-1 text-sm text-zinc-500">Vencimiento: {invoice.due}</p></div>
                <div className="text-right"><p className="font-black tracking-tight text-white">{invoice.amount}</p><p className={`text-sm ${statusColor(invoice.status)}`}>{invoice.status}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950/80 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div><p className="text-sm text-zinc-400">Cobros</p><h2 className="text-xl font-bold tracking-tight">Resumen financiero</h2></div>
            <CreditCard className="h-5 w-5 text-red-500" />
          </div>
          <div className="space-y-4">
            {[
              ['Cobrado esta semana', '$14,820'],
              ['Pendiente por cobrar', '$12,480'],
              ['Pagos vencidos', '$3,640'],
              ['Ticket promedio', '$786'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><p className="text-sm text-zinc-500">{label}</p><p className="mt-2 text-2xl font-black tracking-tight">{value}</p></div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4 flex items-center gap-2"><ClipboardList className="h-5 w-5 text-red-500" /><h3 className="text-lg font-bold tracking-tight">Pasos de una venta</h3></div>
          <div className="space-y-3">
            {['Cliente contactado', 'Cotización enviada', 'Factura generada', 'Pago procesado'].map((step, i) => (
              <div key={step} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-sm font-bold text-red-300">{i + 1}</div><span className="text-zinc-200">{step}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderVehicles = () => (
    <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950/80 p-6">
      <div className="mb-5 flex items-center justify-between">
        <div><p className="text-sm text-zinc-400">Gestión de unidades</p><h2 className="text-xl font-bold tracking-tight">Inventario de vehículos</h2></div>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white"><Filter className="h-4 w-4" /> Filtrar</button>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white"><Plus className="h-4 w-4" /> Agregar unidad</button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {vehicles.map((vehicle) => (
          <div key={vehicle.plate} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><CarFront className="mb-4 h-5 w-5 text-red-500" /><p className="font-semibold text-white">{vehicle.unit}</p><p className="mt-1 text-sm text-zinc-500">Placa: {vehicle.plate}</p><div className="mt-4 flex items-center justify-between text-sm"><span className="text-zinc-400">{vehicle.type}</span><span className={statusColor(vehicle.status)}>{vehicle.status}</span></div></div>
        ))}
      </div>
    </div>
  );

  const renderWorkshop = () => (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
      <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950/80 p-6">
        <div className="mb-5 flex items-center justify-between">
          <div><p className="text-sm text-zinc-400">Taller</p><h2 className="text-xl font-bold tracking-tight">Órdenes de trabajo</h2></div>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white"><Plus className="h-4 w-4" /> Nueva orden</button>
        </div>
        <div className="space-y-3">
          {workshopJobs.map((job) => (
            <div key={job.ticket} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><div className="flex items-center justify-between"><div><p className="font-semibold text-white">{job.ticket} · {job.unit}</p><p className="mt-1 text-sm text-zinc-500">{job.service} · Técnico: {job.tech}</p></div><span className={`text-sm ${statusColor(job.status)}`}>{job.status}</span></div></div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950/80 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div><p className="text-sm text-zinc-400">Calendario</p><h2 className="text-xl font-bold tracking-tight">Agenda del día</h2></div>
            <CalendarDays className="h-5 w-5 text-red-500" />
          </div>
          <div className="space-y-4">
            {[
              ['9:00 AM', 'Entrega de vehículo'],
              ['11:30 AM', 'Cambio de frenos'],
              ['2:00 PM', 'Revisión de contrato'],
              ['4:30 PM', 'Seguimiento de cobro'],
            ].map(([hour, task]) => (
              <div key={hour} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><p className="text-sm text-zinc-500">{hour}</p><p className="mt-1 font-medium text-white">{task}</p></div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4 flex items-center gap-2"><Wrench className="h-5 w-5 text-red-500" /><h3 className="text-lg font-bold tracking-tight">Servicios rápidos</h3></div>
          <div className="grid grid-cols-2 gap-3">
            {['Aceite', 'Frenos', 'Diagnóstico', 'Lavado'].map((service) => (
              <div key={service} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-200">{service}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {reportCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="rounded-[1.5rem] border border-white/10 bg-zinc-950/80 p-5"><Icon className="mb-4 h-5 w-5 text-red-500" /><p className="text-sm text-zinc-400">{card.title}</p><p className="mt-2 text-3xl font-black tracking-tight">{card.value}</p><p className="mt-2 text-sm text-zinc-500">{card.sub}</p></div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950/80 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div><p className="text-sm text-zinc-400">Reportes</p><h2 className="text-xl font-bold tracking-tight">Indicadores clave</h2></div>
            <LineChart className="h-5 w-5 text-red-500" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ReLineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip contentStyle={{ background: '#09090b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} />
                <Line type="monotone" dataKey="valor" stroke="#dc2626" strokeWidth={3} dot={{ r: 4, fill: '#dc2626' }} />
              </ReLineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-red-600/10 via-black to-zinc-500/10 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">Presentación comercial</p>
          <h3 className="mt-3 text-2xl font-black tracking-tight">Esta demo deja ver mucho más del producto</h3>
          <p className="mt-3 leading-7 text-zinc-300">
            Ahora el cliente puede explorar distintas áreas del sistema: clientes, facturación, unidades, taller y reportes. Eso hace que el demo se sienta completo y más vendible.
          </p>
          <div className="mt-6 space-y-3">
            {['Vista ejecutiva', 'CRM de clientes', 'Panel de facturación', 'Inventario de vehículos', 'Órdenes de taller', 'Reportes visuales'].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"><ChevronRight className="h-4 w-4 text-red-500" /><span className="text-zinc-200">{item}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.14),transparent_18%),radial-gradient(circle_at_left,rgba(255,255,255,0.05),transparent_20%),radial-gradient(circle_at_bottom,rgba(120,120,120,0.06),transparent_24%)]" />
        <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-10 lg:px-8">
          <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center">
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-red-200"><Lock className="h-3.5 w-3.5" /> Login Demo</div>
              <h1 className="max-w-3xl text-4xl font-black leading-[1] tracking-tight sm:text-6xl">Entra a una experiencia demo que se siente como un software real</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">Esta entrada premium ayuda a impresionar más al cliente desde el primer segundo. Luego podrá explorar dashboard, clientes, facturación, vehículos, taller y reportes con gráficos visuales.</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ['Acceso elegante', 'Pantalla de entrada premium'],
                  ['Demo comercial', 'Lista para presentar'],
                  ['UX moderna', 'Sensación de producto real'],
                ].map(([title, sub]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="font-semibold text-white">{title}</p><p className="mt-1 text-sm text-zinc-400">{sub}</p></div>
                ))}
              </div>
            </div>

            <motion.div {...fadeUp} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur-2xl lg:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5"><LayoutDashboard className="h-5 w-5 text-red-500" /></div>
                <div><p className="text-xl font-black tracking-tight">Auto<span className="text-red-500">Core</span></p><p className="-mt-1 text-[11px] uppercase tracking-[0.3em] text-zinc-400">Demo Access</p></div>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950/80 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">Acceso al sistema</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight">Iniciar demo</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-400">Pantalla visual para reforzar la sensación de producto SaaS premium.</p>
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm text-zinc-300">Correo</label>
                    <input type="email" defaultValue="demo@autocore.com" className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-zinc-500" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-zinc-300">Contraseña</label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} defaultValue="Demo1234" className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 pr-12 text-white outline-none placeholder:text-zinc-500" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                    </div>
                  </div>
                  <button onClick={() => setIsLoggedIn(true)} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-3.5 font-semibold text-white shadow-[0_18px_60px_rgba(255,0,0,0.22)] transition hover:scale-[1.01]">Entrar al demo<ChevronRight className="h-4 w-4" /></button>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><p className="text-sm text-zinc-500">Acceso</p><p className="mt-1 font-semibold text-white">Demo comercial</p></div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><p className="text-sm text-zinc-500">Incluye</p><p className="mt-1 font-semibold text-white">Gráficos + módulos</p></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.12),transparent_18%),radial-gradient(circle_at_left,rgba(255,255,255,0.05),transparent_20%),radial-gradient(circle_at_bottom,rgba(120,120,120,0.06),transparent_24%)]" />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5"><LayoutDashboard className="h-5 w-5 text-red-500" /></div>
            <div><p className="text-xl font-black tracking-tight">Auto<span className="text-red-500">Core</span></p><p className="-mt-1 text-[11px] uppercase tracking-[0.3em] text-zinc-400">Demo Dashboard</p></div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsLoggedIn(false)} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"><Lock className="h-4 w-4" />Salir demo</button>
            <a href="/" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"><ArrowLeft className="h-4 w-4" />Volver al menú</a>
            <button className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"><Bell className="h-4 w-4 text-zinc-300" /></button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <motion.div {...fadeUp} className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <div className="mb-6 rounded-[1.5rem] border border-red-500/20 bg-red-500/10 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-300">Demo comercial</p>
              <h1 className="mt-2 text-2xl font-black tracking-tight">Versión completa del sistema</h1>
              <p className="mt-2 text-sm leading-6 text-zinc-300">Navega por distintas áreas para mostrarle al cliente todo lo que AutoCore puede hacer.</p>
            </div>
            <div className="space-y-2">
              {menu.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.key;
                return (
                  <button key={item.key} onClick={() => setActiveTab(item.key)} className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${active ? 'border border-red-500/20 bg-red-500/10 text-white' : 'border border-transparent bg-white/[0.03] text-zinc-300 hover:bg-white/[0.06]'}`}>
                    <Icon className={`h-5 w-5 ${active ? 'text-red-400' : 'text-zinc-400'}`} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-zinc-950/80 p-4">
              <div className="mb-3 flex items-center gap-2"><Settings className="h-4 w-4 text-red-500" /><p className="text-sm font-semibold text-white">Acciones rápidas</p></div>
              <div className="space-y-2 text-sm text-zinc-400">
                <button onClick={() => setShowInvoiceModal(true)} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-left hover:bg-white/[0.06]">Crear factura</button>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">Registrar cliente</div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">Agregar vehículo</div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">Generar reporte</div>
              </div>
            </div>
          </aside>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-300">Panel ejecutivo</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">Demo interactivo del sistema</h2>
                <p className="mt-3 max-w-2xl text-zinc-300">Una demostración pensada para enseñar orden, control y presencia profesional a clientes de dealers, rent car, talleres y negocios modernos.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-zinc-300"><Building2 className="h-4 w-4 text-red-400" /> Multi negocio</div>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-zinc-300"><BadgeDollarSign className="h-4 w-4 text-red-400" /> Venta premium</div>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300"><MessageCircle className="h-4 w-4" /> Demo premium</div>
              </div>
            </div>
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'clients' && renderClients()}
            {activeTab === 'billing' && renderBilling()}
            {activeTab === 'vehicles' && renderVehicles()}
            {activeTab === 'workshop' && renderWorkshop()}
            {activeTab === 'reports' && renderReports()}
          </section>
        </motion.div>
      </main>

      {showInvoiceModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-zinc-950 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
            <div className="mb-6 flex items-center justify-between">
              <div><p className="text-sm uppercase tracking-[0.2em] text-red-300">Factura rápida</p><h3 className="mt-2 text-2xl font-black tracking-tight">Nueva factura demo</h3></div>
              <button onClick={() => setShowInvoiceModal(false)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white">Cerrar</button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-zinc-500" placeholder="Cliente" />
              <input className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-zinc-500" placeholder="Monto" />
              <input className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-zinc-500" placeholder="Fecha" />
              <input className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-zinc-500" placeholder="Concepto" />
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4"><p className="text-sm text-zinc-400">Vista previa</p><p className="mt-2 text-lg font-semibold text-white">Factura demo lista para presentar al cliente</p><p className="mt-2 text-sm leading-6 text-zinc-500">Este modal es parte de la nueva actualización para que el usuario sienta que realmente puede interactuar con el sistema.</p></div>
            <div className="mt-6 flex justify-end gap-3"><button onClick={() => setShowInvoiceModal(false)} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white">Cancelar</button><button className="rounded-2xl bg-red-600 px-5 py-3 font-semibold text-white">Guardar factura</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

