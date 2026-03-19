import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔥 DEMO LOGIN
    if (email === "admin@test.com") {
      navigate("/admin");
    } else {
      navigate("/portal");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white px-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-red-600 p-3 rounded-xl font-semibold hover:scale-[1.02] transition">
            Iniciar sesión
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-zinc-400">
          No tienes cuenta?{" "}
          <span
            className="text-red-400 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Regístrate
          </span>
        </p>
      </div>
    </div>
  );
}