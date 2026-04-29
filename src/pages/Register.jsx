import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    business: "",
    owner: "",
    email: "",
    phone: "",
    service: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registro:", form);

    alert("Solicitud enviada (demo)");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white px-4">
      <div className="w-full max-w-lg bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Registro</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            placeholder="Nombre del negocio"
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
            onChange={(e) =>
              setForm({ ...form, business: e.target.value })
            }
          />

          <input
            placeholder="Nombre del dueño"
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
            onChange={(e) =>
              setForm({ ...form, owner: e.target.value })
            }
          />

          <input
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            placeholder="Teléfono"
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <select
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
            onChange={(e) =>
              setForm({ ...form, service: e.target.value })
            }
          >
            <option>Tipo de servicio</option>
            <option>Rent Car</option>
            <option>Dealer</option>
            <option>Taller</option>
          </select>

          <button className="w-full bg-red-600 p-3 rounded-xl font-semibold">
            Enviar solicitud
          </button>
        </form>
      </div>
    </div>
  );
}