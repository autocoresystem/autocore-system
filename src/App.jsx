import { useEffect, useRef, useState } from "react";
import {
  CarFront,
  LayoutDashboard,
  Users,
  Receipt,
  Wallet,
  BarChart3,
  Plus,
  RefreshCw,
  Sparkles,
} from "lucide-react";

const API_URL = "http://localhost:3000";

/* ================= PARTICLES ================= */
function HeroParticleText() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrame;
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

      const fontSize = w < 640 ? 50 : 120;

      octx.fillStyle = "white";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.font = `900 ${fontSize}px Arial`;
      octx.fillText("AutoCore Systems", w / 2, h / 2);

      const data = octx.getImageData(0, 0, w, h).data;

      particles = [];

      for (let y = 0; y < h; y += 6) {
        for (let x = 0; x < w; x += 6) {
          const i = (y * w + x) * 4;
          if (data[i + 3] > 128) {
            particles.push({
              tx: x,
              ty: y,
              x: x + (Math.random() - 0.5) * 200,
              y: y + (Math.random() - 0.5) * 100,
            });
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += 0.02;

      particles.forEach((p) => {
        p.x += (p.tx - p.x) * 0.05;
        p.y += (p.ty - p.y) * 0.05;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(draw);
    };

    build();
    draw();

    window.addEventListener("resize", build);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", build);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-[260px]" />;
}

/* ================= APP ================= */
export default function App() {
  const [vehiculos, setVehiculos] = useState([]);
  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    ano: "",
    precio_compra: "",
    precio_venta: "",
  });

  const fetchVehiculos = async () => {
    const res = await fetch(`${API_URL}/vehiculos`);
    const data = await res.json();
    setVehiculos(data);
  };

  useEffect(() => {
    fetchVehiculos();
  }, []);

  const crearVehiculo = async (e) => {
    e.preventDefault();

    await fetch(`${API_URL}/vehiculos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      marca: "",
      modelo: "",
      ano: "",
      precio_compra: "",
      precio_venta: "",
    });

    fetchVehiculos();
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      {/* HERO */}
      <HeroParticleText />

      <h1 className="text-4xl font-black mt-4">
        Auto<span className="text-red-500">Core</span> Dealer
      </h1>

      {/* FORM */}
      <form onSubmit={crearVehiculo} className="mt-6 space-y-3">
        <input placeholder="Marca" onChange={(e)=>setForm({...form, marca:e.target.value})} />
        <input placeholder="Modelo" onChange={(e)=>setForm({...form, modelo:e.target.value})} />
        <input placeholder="Año" onChange={(e)=>setForm({...form, ano:e.target.value})} />
        <input placeholder="Compra" onChange={(e)=>setForm({...form, precio_compra:e.target.value})} />
        <input placeholder="Venta" onChange={(e)=>setForm({...form, precio_venta:e.target.value})} />

        <button className="bg-red-600 px-4 py-2">Guardar</button>
      </form>

      {/* LISTA */}
      <div className="mt-8">
        {vehiculos.map((v) => (
          <div key={v.id} className="border p-3 mb-2">
            {v.marca} {v.modelo} - ${v.precio_venta}
          </div>
        ))}
      </div>
    </div>
  );
}