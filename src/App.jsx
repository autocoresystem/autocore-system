import { useEffect, useRef, useState } from "react";
import {
  CarFront,
  Plus,
  RefreshCw,
  DollarSign,
  TrendingUp,
  BadgeCheck,
  X,
  Trash2,
  ArrowLeft,
  Wallet,
  Receipt,
Lock,
LogOut,
Eye,
EyeOff,
ShieldCheck,
} from "lucide-react";

const API_URL = "https://autocore-backend-3gkq.onrender.com";

function money(value) {
  return `$${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

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
             sx: x + (Math.random() - 0.5) * 260,
sy: y + (Math.random() - 0.5) * 130,
x: x + (Math.random() - 0.5) * 260,
y: y + (Math.random() - 0.5) * 130,
              s: Math.random() * 1.35 + 0.65,
              a: Math.random() * 0.42 + 0.42,
            });
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      particles.forEach((p) => {
       const cycle = (time % 5) / 5;
const dissolve = cycle > 0.72 ? (cycle - 0.72) / 0.28 : 0;
const reform = cycle < 0.35 ? cycle / 0.35 : 1;

const spread = dissolve > 0 ? dissolve : 1 - reform;

const targetX = p.tx + (p.sx - p.tx) * spread;
const targetY = p.ty + (p.sy - p.ty) * spread;

p.x += (targetX - p.x) * 0.06;
p.y += (targetY - p.y) * 0.06;

        const breath = Math.sin(time + p.tx * 0.01) * 0.7;

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
  const [authToken, setAuthToken] = useState(
  () => localStorage.getItem("autocore_token") || ""
);

const [loginForm, setLoginForm] = useState({
  email: "",
  password: "",
});

const [loginError, setLoginError] = useState("");
const [loginLoading, setLoginLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);

const authHeaders = () => ({
  Authorization: `Bearer ${authToken}`,
});
  const [vehiculos, setVehiculos] = useState([]);
  const [resumen, setResumen] = useState(null);
  const [selected, setSelected] = useState(null);
  const [detalle, setDetalle] = useState(null);
  const [loading, setLoading] = useState(false);

const eliminarVehiculo = async (id) => {
  const confirmar = confirm("¿Seguro que quieres eliminar este vehículo?");
  if (!confirmar) return;

  const res = await fetch(`${API_URL}/vehiculos/${id}`, {
  method: "DELETE",
  headers: {
    ...authHeaders(),
  },
});

  if (!res.ok) {
    alert("No se pudo eliminar el vehículo. Revisa si el backend tiene la ruta DELETE.");
    return;
  }

  if (selected === id) {
    setSelected(null);
    setDetalle(null);
  }

  await fetchAll();
};

  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    ano: "",
    color: "",
    vin: "",
    millas: "",
    precio_compra: "",
    precio_venta: "",
    imagen: "",
    estado: "Disponible",
  });

  const [gastoForm, setGastoForm] = useState({
    categoria: "General",
    descripcion: "",
    monto: "",
    fecha: "",
  });

  const [pagoForm, setPagoForm] = useState({
    monto: "",
    metodo_pago: "Efectivo",
    fecha: "",
    nota: "",
  });
  const iniciarSesion = async (e) => {
  e.preventDefault();
  setLoginError("");
  setLoginLoading(true);

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
    });

    const data = await res.json();

    if (!res.ok) {
      setLoginError(data.error || "Correo o contraseña incorrectos");
      return;
    }

    localStorage.setItem("autocore_token", data.token);
    setAuthToken(data.token);
    setLoginForm({ email: "", password: "" });
  } catch (error) {
    setLoginError("No se pudo conectar con el servidor.");
  } finally {
    setLoginLoading(false);
  }
};

const cerrarSesion = () => {
  localStorage.removeItem("autocore_token");
  setAuthToken("");
  setDetalle(null);
  setSelected(null);
};

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [vehRes, dashRes] = await Promise.all([
        fetch(`${API_URL}/vehiculos`),
        fetch(`${API_URL}/dashboard-resumen`),
      ]);

      setVehiculos(await vehRes.json());
      setResumen(await dashRes.json());
    } finally {
      setLoading(false);
    }
  };

  const fetchDetalle = async (id) => {
    const res = await fetch(`${API_URL}/vehiculos/${id}/detalle`);
    const data = await res.json();
    setDetalle(data);
    setSelected(id);
  };

  useEffect(() => {
  if (authToken) {
    fetchAll();
  }
}, [authToken]);

  const crearVehiculo = async (e) => {
    e.preventDefault();

    await fetch(`${API_URL}/vehiculos`, {
      method: "POST",
     headers: {
  "Content-Type": "application/json",
  ...authHeaders(),
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
      imagen: "",
      estado: "Disponible",
    });

    await fetchAll();
  };

  const agregarGasto = async (e) => {
    e.preventDefault();
    if (!selected) return;

    await fetch(`${API_URL}/vehiculos/${selected}/gastos`, {
      method: "POST",
      headers: {
  "Content-Type": "application/json",
  ...authHeaders(),
},
      body: JSON.stringify({
        ...gastoForm,
        monto: Number(gastoForm.monto) || 0,
      }),
    });

    setGastoForm({ categoria: "General", descripcion: "", monto: "", fecha: "" });
    await fetchDetalle(selected);
    await fetchAll();
  };

  const agregarPago = async (e) => {
    e.preventDefault();
    if (!selected) return;

    await fetch(`${API_URL}/vehiculos/${selected}/pagos`, {
      method: "POST",
      headers: {
  "Content-Type": "application/json",
  ...authHeaders(),
},
      body: JSON.stringify({
        ...pagoForm,
        monto: Number(pagoForm.monto) || 0,
      }),
    });

    setPagoForm({ monto: "", metodo_pago: "Efectivo", fecha: "", nota: "" });
    await fetchDetalle(selected);
    await fetchAll();
  };

  const eliminarGasto = async (id) => {
    const res = await fetch(`${API_URL}/gastos/${id}`, {
  method: "DELETE",
  headers: {
    ...authHeaders(),
  },
});

if (!res.ok) {
  alert("No se pudo eliminar el gasto. Inicia sesión otra vez.");
  if (res.status === 401) cerrarSesion();
  return;
}
    await fetchDetalle(selected);
    await fetchAll();
  };

  const eliminarPago = async (id) => {
    const res = await fetch(`${API_URL}/pagos/${id}`, {
  method: "DELETE",
  headers: {
    ...authHeaders(),
  },
});

if (!res.ok) {
  alert("No se pudo eliminar el pago. Inicia sesión otra vez.");
  if (res.status === 401) cerrarSesion();
  return;
}
    await fetchDetalle(selected);
    await fetchAll();
  };
  if (!authToken) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_25%)]" />

      <main className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <img
                src="/autocore-logo.png"
                alt="AutoCore"
                className="h-16 w-auto drop-shadow-[0_0_25px_rgba(220,38,38,0.45)]"
              />
              <div>
                <h1 className="text-3xl font-black">
                  Auto<span className="text-red-500">Core</span>
                </h1>
                <p className="-mt-1 text-xs uppercase tracking-[0.42em] text-zinc-400">
                  System
                </p>
              </div>
            </div>

            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-red-200">
              <ShieldCheck size={14} />
              Secure Dealer Access
            </p>

            <h2 className="max-w-3xl text-5xl font-black leading-tight tracking-tight sm:text-7xl">
              Control premium para ventas, gastos y ganancia real.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Accede al panel privado de AutoCore System para administrar vehículos,
              registrar gastos, controlar pagos y calcular ganancias limpias.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {["Inventario", "Gastos", "Ganancia real"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <p className="font-bold text-white">{item}</p>
                  <p className="mt-1 text-sm text-zinc-500">Protegido</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl lg:p-8">
            <div className="mb-6">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600/15 text-red-400">
                <Lock size={26} />
              </div>

              <p className="text-sm font-bold uppercase tracking-[0.24em] text-red-300">
                Login
              </p>

              <h3 className="mt-2 text-3xl font-black">Entrar al sistema</h3>

              <p className="mt-2 text-sm text-zinc-400">
                Usa tus credenciales privadas de AutoCore.
              </p>
            </div>

            <form onSubmit={iniciarSesion} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Correo
                </label>

                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                  placeholder="admin@autocore.com"
                  className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Contraseña
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3.5 pr-12 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/50"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">
                  {loginError}
                </div>
              )}

              <button
                disabled={loginLoading}
                className="w-full rounded-2xl bg-red-600 px-6 py-3.5 font-black text-white shadow-[0_18px_60px_rgba(220,38,38,0.28)] transition hover:scale-[1.01] hover:bg-red-700 disabled:opacity-60"
              >
                {loginLoading ? "Entrando..." : "Entrar al panel"}
              </button>
            </form>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-zinc-400">
              Sesión protegida por token. El acceso expira automáticamente.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

  if (detalle) {
    const v = detalle.vehiculo;
    const precioVenta = Number(v.precio_venta || v.precio_esperado || 0);
    const precioCompra = Number(v.precio_compra || 0);
    const totalGastos = Number(v.total_gastos || 0);
    const totalPagos = Number(v.total_pagos || 0);
    const ganancia = Number(v.ganancia_limpia || 0);
    const balance = precioVenta - totalPagos;

    return (
      <div className="min-h-screen bg-black text-white">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.2),transparent_30%)]" />

        <header className="border-b border-white/10 bg-black/90 backdrop-blur-2xl">
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

            <button
              onClick={() => {
                setDetalle(null);
                setSelected(null);
              }}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 font-semibold hover:bg-white/10"
            >
              <ArrowLeft size={18} />
              Volver
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-8">
          <section className="overflow-hidden rounded-[2rem] border border-red-500/20 bg-[linear-gradient(135deg,rgba(220,38,38,0.18),rgba(10,10,10,0.96))] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.5)]">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="mb-6 inline-flex rounded-full bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-[0.2em]">
                  Venta-{String(v.id).padStart(3, "0")}
                </div>

                <h2 className="text-5xl font-black italic tracking-tight text-red-500">
                  AutoCore
                </h2>

                <div className="mt-6 h-1 w-72 bg-red-600" />

                <p className="mt-7 text-sm font-black uppercase tracking-[0.3em] text-zinc-300">
                  Venta de vehículo
                </p>

                <h1 className="mt-4 text-4xl font-black uppercase leading-tight">
                  {v.marca} {v.modelo}
                  <br />
                  <span className="text-zinc-400">
                    ({v.ano}) {v.color || ""}
                  </span>
                </h1>

                <p className="mt-3 text-sm font-bold text-red-400">
                  Vehículo {v.estado || "Disponible"}
                </p>

                <p className="mt-6 text-xs uppercase tracking-[0.25em] text-zinc-400">
                  Precio total vendido
                </p>

                <p className="mt-2 text-5xl font-black text-red-500">
                  {money(precioVenta)}
                </p>
              </div>

              <div>
                <div className="mb-4 text-right text-sm font-bold text-zinc-300">
                  {new Date(v.created_at || Date.now()).toISOString().slice(0, 10)}
                </div>

                <div className="rounded-[1.5rem] border-2 border-red-600 bg-black p-2 shadow-[0_0_35px_rgba(220,38,38,0.25)]">
                  {v.imagen ? (
                    <img
                      src={v.imagen}
                      alt={`${v.marca} ${v.modelo}`}
                      className="h-72 w-full rounded-[1.2rem] object-cover"
                    />
                  ) : (
                    <div className="flex h-72 items-center justify-center rounded-[1.2rem] bg-zinc-900">
                      <CarFront size={90} className="text-red-500" />
                    </div>
                  )}

                  <p className="mt-2 px-2 text-xs uppercase tracking-[0.18em] text-zinc-500">
                    Chasis: {v.vin || "No registrado"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-3xl font-black uppercase">Gastos</h3>
              <div className="mt-3 h-1 w-full bg-red-600" />

              <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full min-w-[760px] text-sm">
                  <thead className="bg-black/50 text-zinc-300">
                    <tr>
                      <th className="px-4 py-3 text-left">Num</th>
                      <th className="px-4 py-3 text-left">Descripción</th>
                      <th className="px-4 py-3 text-left">Fecha</th>
                      <th className="px-4 py-3 text-right">Precio</th>
                      <th className="px-4 py-3 text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {detalle.gastos.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-4 py-5 text-zinc-500">
                          No hay gastos registrados.
                        </td>
                      </tr>
                    ) : (
                      detalle.gastos.map((g, i) => (
                        <tr key={g.id} className="border-t border-white/10">
                          <td className="px-4 py-3">{i + 1}</td>
                          <td className="px-4 py-3">{g.descripcion || g.categoria}</td>
                          <td className="px-4 py-3">
                            {String(g.fecha || "").slice(0, 10)}
                          </td>
                          <td className="px-4 py-3 text-right">{money(g.monto)}</td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => eliminarGasto(g.id)}
                              className="rounded-full bg-white/10 p-2 hover:bg-red-600"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}

                    <tr className="border-t border-red-500/40 bg-black/50 font-black">
                      <td className="px-4 py-3" colSpan="3">
                        TOTAL
                      </td>
                      <td className="px-4 py-3 text-right text-red-400">
                        {money(totalGastos)}
                      </td>
                      <td />
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="ml-auto mt-6 max-w-md space-y-3">
                <SummaryRow label="Precio compra" value={money(precioCompra)} />
                <SummaryRow label="Total gastos" value={money(totalGastos)} />
                <SummaryRow label="Pagos recibidos" value={money(totalPagos)} />
                <SummaryRow label="Balance pendiente" value={money(balance)} />
                <SummaryRow
                  label="Ganancia limpia"
                  value={money(ganancia)}
                  highlight
                />
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-6 lg:grid-cols-2">
            <Panel title="Agregar gasto" icon={Receipt}>
              <form onSubmit={agregarGasto} className="space-y-3">
                <Input label="Categoría" value={gastoForm.categoria} onChange={(e) => setGastoForm({ ...gastoForm, categoria: e.target.value })} />
                <Input label="Descripción" value={gastoForm.descripcion} onChange={(e) => setGastoForm({ ...gastoForm, descripcion: e.target.value })} />
                <Input label="Monto" value={gastoForm.monto} onChange={(e) => setGastoForm({ ...gastoForm, monto: e.target.value })} />
                <Input type="date" label="Fecha" value={gastoForm.fecha} onChange={(e) => setGastoForm({ ...gastoForm, fecha: e.target.value })} />
                <button className="w-full rounded-2xl bg-red-600 px-5 py-3 font-black hover:bg-red-700">
                  Agregar gasto
                </button>
              </form>
            </Panel>

            <Panel title="Agregar pago / abono" icon={Wallet}>
              <form onSubmit={agregarPago} className="space-y-3">
                <Input label="Monto" value={pagoForm.monto} onChange={(e) => setPagoForm({ ...pagoForm, monto: e.target.value })} />
                <Input label="Método de pago" value={pagoForm.metodo_pago} onChange={(e) => setPagoForm({ ...pagoForm, metodo_pago: e.target.value })} />
                <Input type="date" label="Fecha" value={pagoForm.fecha} onChange={(e) => setPagoForm({ ...pagoForm, fecha: e.target.value })} />
                <Input label="Nota" value={pagoForm.nota} onChange={(e) => setPagoForm({ ...pagoForm, nota: e.target.value })} />
                <button className="w-full rounded-2xl bg-red-600 px-5 py-3 font-black hover:bg-red-700">
                  Agregar pago
                </button>
              </form>

              <div className="mt-5 space-y-2">
                {detalle.pagos.length === 0 ? (
                  <p className="text-sm text-zinc-500">No hay pagos registrados.</p>
                ) : (
                  detalle.pagos.map((p) => (
                    <div key={p.id} className="flex items-center justify-between rounded-xl bg-black/40 p-3 text-sm">
                      <span>{p.metodo_pago} · {String(p.fecha || "").slice(0, 10)}</span>
                      <div className="flex items-center gap-3">
                        <strong>{money(p.monto)}</strong>
                        <button onClick={() => eliminarPago(p.id)} className="rounded-full bg-white/10 p-2 hover:bg-red-600">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Panel>
          </section>
        </main>
      </div>
    );
  }

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
          <button
  onClick={cerrarSesion}
  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-zinc-300 hover:bg-white/10 hover:text-white"
>
  <LogOut size={16} />
  Salir
</button>

          <button onClick={fetchAll} className="rounded-2xl border border-white/10 bg-white/5 p-3 hover:bg-white/10">
            <RefreshCw size={18} />
          </button>
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

        <section className="mt-8 grid gap-5 md:grid-cols-4">
          <StatCard icon={CarFront} title="Vehículos" value={resumen?.total_vehiculos || vehiculos.length} />
          <StatCard icon={DollarSign} title="Total invertido" value={money(resumen?.total_invertido)} />
          <StatCard icon={Receipt} title="Total gastos" value={money(resumen?.total_gastos)} />
          <StatCard icon={TrendingUp} title="Ganancia potencial" value={money(resumen?.ganancia_potencial)} />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <h2 className="text-2xl font-black">Agregar vehículo</h2>

            <form onSubmit={crearVehiculo} className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["Marca", "marca"],
                ["Modelo", "modelo"],
                ["Año", "ano"],
                ["Color", "color"],
                ["VIN / Chasis", "vin"],
                ["Millas", "millas"],
                ["Precio compra", "precio_compra"],
                ["Precio venta", "precio_venta"],
                ["URL imagen", "imagen"],
              ].map(([label, key]) => (
                <Input
                  key={key}
                  label={label}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              ))}

              <button className="rounded-2xl bg-red-600 px-6 py-3.5 font-black hover:bg-red-700 sm:col-span-2">
                Guardar vehículo
              </button>
            </form>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <h2 className="text-2xl font-black">Vehículos registrados</h2>

            <div className="mt-5 space-y-3">
              {loading ? (
                <p className="text-zinc-400">Cargando...</p>
              ) : vehiculos.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-black/40 p-5 text-zinc-400">
                  Todavía no hay vehículos registrados.
                </div>
              ) : (
                vehiculos.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => fetchDetalle(v.id)}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-left transition hover:border-red-500/40 hover:bg-red-500/5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-black">
                          {v.marca} {v.modelo}{" "}
                          <span className="text-zinc-500">{v.ano}</span>
                        </h3>
                        <p className="mt-1 text-sm text-zinc-400">
                          Compra {money(v.precio_compra)} · Venta {money(v.precio_venta)}
                        </p>
                      </div>

                      <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-300">
                        Ver detalle
                      </span>
                    </div>
                    <button
  onClick={(e) => {
    e.stopPropagation();
    eliminarVehiculo(v.id);
  }}
  className="rounded-full border border-red-500/30 bg-red-500/10 p-2 text-red-300 transition hover:bg-red-600 hover:text-white"
>
  <Trash2 size={16} />
</button>

                    <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                      <MiniStat label="Gastos" value={money(v.total_gastos)} />
                      <MiniStat label="Pagos" value={money(v.total_pagos)} />
                      <MiniStat label="Ganancia" value={money(v.ganancia_limpia)} />
                    </div>
                  </button>
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

function MiniStat({ label, value }) {
  return (
    <div className="rounded-xl bg-white/[0.04] p-3">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}

function SummaryRow({ label, value, highlight }) {
  return (
    <div className={`flex items-center justify-between rounded-xl px-5 py-3 ${highlight ? "bg-red-600 font-black" : "bg-white/10"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Panel({ title, icon: Icon, children }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center gap-3">
        <Icon className="text-red-500" />
        <h3 className="text-xl font-black">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-300">{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={onChange}
        placeholder={label}
        className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/50"
      />
    </div>
  );
}