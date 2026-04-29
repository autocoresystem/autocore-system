import { useEffect, useState } from "react";
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
} from "lucide-react";

const API_URL = "http://localhost:3000";

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
      console.error("Error cargando vehículos:", error);
      alert("Error cargando vehículos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehiculos();
  }, []);

  const handleVehicleChange = (e) => {
    setVehicleForm({
      ...vehicleForm,
      [e.target.name]: e.target.value,
    });
  };

  const crearVehiculo = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/vehiculos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...vehicleForm,
          ano: Number(vehicleForm.ano) || null,
          millas: Number(vehicleForm.millas) || 0,
          precio_compra: Number(vehicleForm.precio_compra) || 0,
          precio_venta: Number(vehicleForm.precio_venta) || 0,
        }),
      });

      if (!res.ok) throw new Error("Error creando vehículo");

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
    } catch (error) {
      console.error(error);
      alert("No se pudo agregar el vehículo");
    }
  };

  const totalInventario = vehiculos.reduce(
    (sum, v) => sum + Number(v.precio_venta || 0),
    0
  );

  const totalCosto = vehiculos.reduce(
    (sum, v) => sum + Number(v.precio_compra || 0),
    0
  );

  const gananciaPotencial = totalInventario - totalCosto;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.16),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_24%)]" />

      <header className="border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img
              src="/autocore-logo.png"
              alt="AutoCore"
              className="h-12 w-auto"
            />
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

      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[250px_1fr]">
        <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-red-300">
              Menú
            </p>
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

              <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10">
                <div className="grid grid-cols-8 bg-white/[0.05] px-4 py-3 text-sm font-bold text-zinc-400">
                  <span>Marca</span>
                  <span>Modelo</span>
                  <span>Año</span>
                  <span>Color</span>
                  <span>VIN</span>
                  <span>Compra</span>
                  <span>Venta</span>
                  <span>Estado</span>
                </div>

                {loading ? (
                  <div className="p-5 text-zinc-400">Cargando...</div>
                ) : vehiculos.length === 0 ? (
                  <div className="p-5 text-zinc-400">No hay vehículos registrados.</div>
                ) : (
                  vehiculos.map((v) => (
                    <div
                      key={v.id}
                      className="grid grid-cols-8 border-t border-white/10 px-4 py-4 text-sm text-zinc-200"
                    >
                      <span>{v.marca}</span>
                      <span>{v.modelo}</span>
                      <span>{v.ano}</span>
                      <span>{v.color || "-"}</span>
                      <span>{v.vin || "-"}</span>
                      <span>${Number(v.precio_compra || 0).toLocaleString()}</span>
                      <span>${Number(v.precio_venta || v.precio_esperado || 0).toLocaleString()}</span>
                      <span className="text-red-300">{v.estado || "Disponible"}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab !== "dashboard" && activeTab !== "vehiculos" && (
            <div className="flex min-h-[400px] items-center justify-center rounded-[1.5rem] border border-white/10 bg-black/30">
              <div className="text-center">
                <Search className="mx-auto mb-4 text-red-500" size={42} />
                <h2 className="text-3xl font-black">Módulo en construcción</h2>
                <p className="mt-2 text-zinc-400">
                  Ahora estamos conectando primero inventario. Luego seguimos con {activeTab}.
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
  );
}