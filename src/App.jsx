<<<<<<< HEAD
import { useEffect, useRef, useState } from "react";
import {
  CarFront,
  LayoutDashboard,
  Users,
  Receipt,
  Wallet,
  BarChart3,
  Plus,
  Search,
  RefreshCw,
  Sparkles,
} from "lucide-react";

const API_URL = "http://localhost:3000";

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

      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const offCtx = off.getContext("2d");

      offCtx.fillStyle = "#fff";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";

      const fontSize = isMobile
        ? Math.min(width * 0.12, 54)
        : Math.min(width * 0.1, 120);

      offCtx.font = `900 ${fontSize}px Inter, Arial, sans-serif`;
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
              size: isMobile ? Math.random() * 1.1 + 0.6 : Math.random() * 1.6 + 0.7,
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
      const compact = easeOutCubic(Math.min(time / (isMobile ? 1.4 : 2.2), 1));
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
        className="relative z-10 block h-[170px] w-full sm:h-[260px] lg:h-[360px]"
      />
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [vehicleForm, setVehicleForm] = useState({
    marca: "",
    modelo: "",
    ano: "",
    color: "",
    vin: "",
    millas: "",
    precio_compra: "",
    precio_venta: "",
  });

  const menu = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "vehiculos", label: "Vehículos", icon: CarFront },
    { key: "clientes", label: "Clientes", icon: Users },
    { key: "ventas", label: "Ventas", icon: Receipt },
    { key: "pagos", label: "Pagos", icon: Wallet },
    { key: "reportes", label: "Reportes", icon: BarChart3 },
  ];

  const fetchVehiculos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/vehiculos`);
      const data = await res.json();
      setVehiculos(data);
    } catch (error) {
      alert("Error cargando vehículos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehiculos();
  }, []);

  const handleVehicleChange = (e) => {
    setVehicleForm({ ...vehicleForm, [e.target.name]: e.target.value });
  };

  const crearVehiculo = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/vehiculos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...vehicleForm,
          ano: Number(vehicleForm.ano) || null,
          millas: Number(vehicleForm.millas) || 0,
          precio_compra: Number(vehicleForm.precio_compra) || 0,
          precio_venta: Number(vehicleForm.precio_venta) || 0,
        }),
      });

      if (!res.ok) throw new Error();

      setVehicleForm({
        marca: "",
        modelo: "",
        ano: "",
        color: "",
        vin: "",
        millas: "",
        precio_compra: "",
        precio_venta: "",
      });

      await fetchVehiculos();
      alert("Vehículo agregado correctamente");
    } catch {
      alert("No se pudo agregar el vehículo");
    }
  };

  const totalInventario = vehiculos.reduce(
    (sum, v) => sum + Number(v.precio_venta || v.precio_esperado || 0),
    0
  );

  const totalCosto = vehiculos.reduce(
    (sum, v) => sum + Number(v.precio_compra || 0),
    0
  );

  const gananciaPotencial = totalInventario - totalCosto;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,0,0,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_22%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/autocore-logo.png" alt="AutoCore" className="h-12 w-auto" />
            <div>
              <h1 className="text-2xl font-black">
                Auto<span className="text-red-500">Core</span>
              </h1>
              <p className="-mt-1 text-xs uppercase tracking-[0.35em] text-zinc-400">
                System
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300">
            Dealer Sales System
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pt-8">
        <div className="rounded-[2rem] border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-red-200">
            <Sparkles size={14} />
            AutoCore System · Dealer Sales
          </div>

          <HeroParticleText />

          <p className="mt-1 px-2 text-center text-[10px] uppercase tracking-[0.28em] text-zinc-400 sm:text-sm sm:tracking-[0.38em]">
            Inventario · Ventas · Ganancia Real
          </p>
        </div>
      </section>

      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[250px_1fr]">
        <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-red-300">Menú</p>
            <h2 className="mt-2 text-xl font-black">Control de ventas</h2>
          </div>

          <div className="space-y-2">
            {menu.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                    active
                      ? "border border-red-500/30 bg-red-500/10 text-white"
                      : "border border-white/5 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.07]"
                  }`}
                >
                  <Icon className={active ? "text-red-400" : "text-zinc-400"} size={20} />
                  <span className="font-semibold">{item.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          {activeTab === "dashboard" && (
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-300">
                Dashboard
              </p>
              <h2 className="mt-2 text-4xl font-black">Resumen del dealer</h2>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <Card title="Vehículos registrados" value={vehiculos.length} />
                <Card title="Valor inventario" value={`$${totalInventario.toLocaleString()}`} />
                <Card title="Ganancia potencial" value={`$${gananciaPotencial.toLocaleString()}`} />
              </div>
            </div>
          )}

          {activeTab === "vehiculos" && (
            <div>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-300">
                    Inventario
                  </p>
                  <h2 className="mt-2 text-4xl font-black">Vehículos</h2>
                  <p className="mt-2 text-zinc-400">
                    Agrega y administra vehículos del dealer.
                  </p>
                </div>

                <button
                  onClick={fetchVehiculos}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-semibold hover:bg-white/10"
                >
                  <RefreshCw size={18} />
                  Refrescar
                </button>
              </div>

              <form
                onSubmit={crearVehiculo}
                className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/40 p-5"
              >
                <h3 className="mb-5 flex items-center gap-2 text-xl font-black">
                  <Plus className="text-red-500" />
                  Agregar vehículo
                </h3>

                <div className="grid gap-4 md:grid-cols-4">
                  <Input name="marca" placeholder="Marca" value={vehicleForm.marca} onChange={handleVehicleChange} />
                  <Input name="modelo" placeholder="Modelo" value={vehicleForm.modelo} onChange={handleVehicleChange} />
                  <Input name="ano" placeholder="Año" value={vehicleForm.ano} onChange={handleVehicleChange} />
                  <Input name="color" placeholder="Color" value={vehicleForm.color} onChange={handleVehicleChange} />
                  <Input name="vin" placeholder="VIN / Chasis" value={vehicleForm.vin} onChange={handleVehicleChange} />
                  <Input name="millas" placeholder="Millas" value={vehicleForm.millas} onChange={handleVehicleChange} />
                  <Input name="precio_compra" placeholder="Precio compra" value={vehicleForm.precio_compra} onChange={handleVehicleChange} />
                  <Input name="precio_venta" placeholder="Precio venta" value={vehicleForm.precio_venta} onChange={handleVehicleChange} />
                </div>

                <button className="mt-5 rounded-2xl bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700">
                  Guardar vehículo
                </button>
              </form>

              <div className="mt-8 overflow-x-auto rounded-[1.5rem] border border-white/10">
                <table className="w-full min-w-[900px] text-sm">
                  <thead className="bg-white/[0.05] text-zinc-400">
                    <tr>
                      <th className="px-4 py-3 text-left">Marca</th>
                      <th className="px-4 py-3 text-left">Modelo</th>
                      <th className="px-4 py-3 text-left">Año</th>
                      <th className="px-4 py-3 text-left">Color</th>
                      <th className="px-4 py-3 text-left">VIN</th>
                      <th className="px-4 py-3 text-left">Compra</th>
                      <th className="px-4 py-3 text-left">Venta</th>
                      <th className="px-4 py-3 text-left">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="8" className="p-5 text-zinc-400">Cargando...</td>
                      </tr>
                    ) : vehiculos.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="p-5 text-zinc-400">No hay vehículos registrados.</td>
                      </tr>
                    ) : (
                      vehiculos.map((v) => (
                        <tr key={v.id} className="border-t border-white/10 text-zinc-200">
                          <td className="px-4 py-4">{v.marca}</td>
                          <td className="px-4 py-4">{v.modelo}</td>
                          <td className="px-4 py-4">{v.ano}</td>
                          <td className="px-4 py-4">{v.color || "-"}</td>
                          <td className="px-4 py-4">{v.vin || "-"}</td>
                          <td className="px-4 py-4">${Number(v.precio_compra || 0).toLocaleString()}</td>
                          <td className="px-4 py-4">${Number(v.precio_venta || v.precio_esperado || 0).toLocaleString()}</td>
                          <td className="px-4 py-4 text-red-300">{v.estado || "Disponible"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab !== "dashboard" && activeTab !== "vehiculos" && (
            <div className="flex min-h-[400px] items-center justify-center rounded-[1.5rem] border border-white/10 bg-black/30">
              <div className="text-center">
                <Search className="mx-auto mb-4 text-red-500" size={42} />
                <h2 className="text-3xl font-black">Módulo en construcción</h2>
                <p className="mt-2 text-zinc-400">
                  Primero conectamos inventario. Luego seguimos con {activeTab}.
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-5">
      <p className="text-sm text-zinc-400">{title}</p>
      <p className="mt-3 text-3xl font-black">{value}</p>
    </div>
  );
}

function Input({ name, placeholder, value, onChange }) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-red-500/50"
    />
=======
import { Routes, Route } from "react-router-dom";

// Parte pública
import PublicHome from "./pages/PublicHome";

// Demo viejo
import Dashboard from "./Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Nuevos premium
import LoginPlus from "./pages/LoginPlus";
import RegisterPlus from "./pages/RegisterPlus";

// Portales
import ClientPortal from "./pages/ClientPortal";
import AdminPortal from "./pages/AdminPortal";

export default function App() {
  return (
    <Routes>
      {/* Landing pública */}
      <Route path="/" element={<PublicHome />} />

      {/* Demo viejo */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Nuevos premium */}
      <Route path="/login-plus" element={<LoginPlus />} />
      <Route path="/register-plus" element={<RegisterPlus />} />

      {/* Portales */}
      <Route path="/portal" element={<ClientPortal />} />
      <Route path="/admin" element={<AdminPortal />} />
    </Routes>
>>>>>>> 34a1fc76b1181676d56a10dee8dab228ef08709b
  );
}