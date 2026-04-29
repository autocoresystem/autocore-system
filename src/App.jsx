import { useEffect, useRef, useState } from "react";
import {
  CarFront,
  LayoutDashboard,
  Plus,
  RefreshCw,
  DollarSign,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";

const API_URL = "http://localhost:3000";

function HeroParticleText() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let frame;
    let time = 0;

    const build = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;

      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const octx = off.getContext("2d");

      const fontSize = w < 640 ? 42 : 110;

      octx.fillStyle = "white";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.font = `900 ${fontSize}px Inter, Arial, sans-serif`;
      octx.fillText("AutoCore Systems", w / 2, h / 2);

      const data = octx.getImageData(0, 0, w, h).data;
      particles = [];

      const gap = w < 640 ? 7 : 6;

      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          const i = (y * w + x) * 4;
          if (data[i + 3] > 120) {
            particles.push({
              tx: x,
              ty: y,
              x: x + (Math.random() - 0.5) * 140,
              y: y + (Math.random() - 0.5) * 80,
              s: Math.random() * 1.4 + 0.7,
              a: Math.random() * 0.4 + 0.45,
            });
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      particles.forEach((p) => {
        p.x += (p.tx - p.x) * 0.055;
        p.y += (p.ty - p.y) * 0.055;

        const breath = Math.sin(time + p.tx * 0.01) * 0.6;

        ctx.beginPath();
        ctx.arc(p.x, p.y + breath, p.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(255,255,255,0.25)";
        ctx.fill();
      });

      frame = requestAnimationFrame(draw);
    };

    build();
    draw();

    window.addEventListener("resize", build);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", build);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-[210px] w-full sm:h-[280px]" />;
}

export default function App() {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    ano: "",
    color: "",
    vin: "",
    millas: "",
    precio_compra: "",
    precio_venta: "",
  });

  const fetchVehiculos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/vehiculos`);
      const data = await res.json();
      setVehiculos(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehiculos();
  }, []);

  const crearVehiculo = async (e) => {
    e.preventDefault();

    await fetch(`${API_URL}/vehiculos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        ano: Number(form.ano) || null,
        millas: Number(form.millas) || 0,
        precio_compra: Number(form.precio_compra) || 0,
        precio_venta: Number(form.precio_venta) || 0,
      }),
    });

    setForm({
      marca: "",
      modelo: "",
      ano: "",
      color: "",
      vin: "",
      millas: "",
      precio_compra: "",
      precio_venta: "",
    });

    fetchVehiculos();
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
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_25%)]" />

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

          <div className="hidden rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 sm:block">
            Dealer Sales System
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-red-200">
            <BadgeCheck size={14} />
            AutoCore System · Dealer Sales
          </div>

          <HeroParticleText />

          <p className="text-center text-xs uppercase tracking-[0.32em] text-zinc-400">
            Inventario · Ventas · Ganancia Real
          </p>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <StatCard icon={CarFront} title="Vehículos" value={vehiculos.length} />
          <StatCard
            icon={DollarSign}
            title="Valor inventario"
            value={`$${totalInventario.toLocaleString()}`}
          />
          <StatCard
            icon={TrendingUp}
            title="Ganancia potencial"
            value={`$${gananciaPotencial.toLocaleString()}`}
          />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/15 text-red-400">
                <Plus size={24} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-red-300">
                  Inventario
                </p>
                <h2 className="text-2xl font-black">Agregar vehículo</h2>
              </div>
            </div>

            <form onSubmit={crearVehiculo} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Marca" name="marca" value={form.marca} setForm={setForm} form={form} />
                <Input label="Modelo" name="modelo" value={form.modelo} setForm={setForm} form={form} />
                <Input label="Año" name="ano" value={form.ano} setForm={setForm} form={form} />
                <Input label="Color" name="color" value={form.color} setForm={setForm} form={form} />
                <Input label="VIN / Chasis" name="vin" value={form.vin} setForm={setForm} form={form} />
                <Input label="Millas" name="millas" value={form.millas} setForm={setForm} form={form} />
                <Input label="Precio compra" name="precio_compra" value={form.precio_compra} setForm={setForm} form={form} />
                <Input label="Precio venta" name="precio_venta" value={form.precio_venta} setForm={setForm} form={form} />
              </div>

              <button className="mt-2 rounded-2xl bg-red-600 px-6 py-3.5 font-bold text-white shadow-[0_18px_50px_rgba(220,38,38,0.25)] transition hover:scale-[1.01] hover:bg-red-700">
                Guardar vehículo
              </button>
            </form>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-red-300">
                  Vehículos
                </p>
                <h2 className="text-2xl font-black">Inventario actual</h2>
              </div>

              <button
                onClick={fetchVehiculos}
                className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
              >
                <RefreshCw size={18} />
              </button>
            </div>

            <div className="space-y-3">
              {loading ? (
                <p className="text-zinc-400">Cargando...</p>
              ) : vehiculos.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-black/40 p-5 text-zinc-400">
                  Todavía no hay vehículos registrados.
                </div>
              ) : (
                vehiculos.map((v) => (
                  <div
                    key={v.id}
                    className="rounded-2xl border border-white/10 bg-black/40 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-black">
                          {v.marca} {v.modelo}{" "}
                          <span className="text-zinc-500">{v.ano}</span>
                        </h3>
                        <p className="mt-1 text-sm text-zinc-400">
                          {v.color || "Sin color"} · VIN: {v.vin || "-"}
                        </p>
                      </div>

                      <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-300">
                        {v.estado || "Disponible"}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl bg-white/[0.04] p-3">
                        <p className="text-zinc-500">Compra</p>
                        <p className="font-bold">
                          ${Number(v.precio_compra || 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="rounded-xl bg-white/[0.04] p-3">
                        <p className="text-zinc-500">Venta</p>
                        <p className="font-bold">
                          ${Number(v.precio_venta || 0).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, title, value }) {
  return (
    <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/15 text-red-400">
        <Icon size={22} />
      </div>
      <p className="text-sm text-zinc-400">{title}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}

function Input({ label, name, value, form, setForm }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-300">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        placeholder={label}
        className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/50"
      />
    </div>
  );
}