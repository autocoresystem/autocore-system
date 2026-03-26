import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

export default function LoginPlus() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registered = searchParams.get("registered") === "1";

  const handleLogin = (e) => {
    e.preventDefault();

    if (email.toLowerCase() === "admin@test.com") {
      localStorage.setItem(
        "autocore_current_user",
        JSON.stringify({
          role: "admin",
          email,
          name: "AutoCore Admin",
        })
      );
      navigate("/admin");
      return;
    }

    const requests =
      JSON.parse(localStorage.getItem("autocore_requests")) || [];

    const matchedRequest = requests.find(
      (item) => item.email?.toLowerCase() === email.toLowerCase()
    );

    if (matchedRequest) {
      localStorage.setItem(
        "autocore_current_user",
        JSON.stringify({
          role: "client",
          email,
          name: matchedRequest.owner,
          business: matchedRequest.business,
          service: matchedRequest.service,
        })
      );
      navigate("/portal");
      return;
    }

    alert(
      "No encontramos ese acceso todavía. Regístrate primero o usa admin@test.com para demo admin."
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,0,0,0.18),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_18%)]" />
      <div className="absolute left-1/2 top-1/4 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl" />

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65 }}
          className="hidden lg:flex flex-col justify-center px-14 py-16"
        >
          <div className="max-w-xl">
            <Link to="/" className="mb-8 inline-flex items-center gap-3 group">
              <img
                src="/autocore-logo.png"
                alt="AutoCore"
                className="h-12 w-auto drop-shadow-[0_0_20px_rgba(255,0,0,0.55)]"
              />
              <div>
                <p className="text-2xl font-extrabold tracking-tight">
                  Auto<span className="text-red-500">Core</span>
                </p>
                <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-400">
                  Systems
                </p>
              </div>
            </Link>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-300">
              Secure Access
            </p>

            <h1 className="mt-4 text-5xl font-extrabold leading-[1] tracking-tight">
              Access the
              <span className="block text-red-500">AutoCore Workspace</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-zinc-300">
              Sign in to access your client portal, project progress, invoices,
              admin tools, and business workspace in one premium platform.
            </p>

            <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: "Secure Login",
                    subtitle: "Protected access",
                    icon: ShieldCheck,
                  },
                  {
                    title: "Reports",
                    subtitle: "Business visibility",
                    icon: BarChart3,
                  },
                  {
                    title: "Payments",
                    subtitle: "Invoices & billing",
                    icon: CreditCard,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/10 bg-black/30 p-4"
                    >
                      <Icon className="mb-3 h-5 w-5 text-red-500" />
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-zinc-400">{item.subtitle}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-400">Workspace Preview</p>
                  <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-red-300">
                    Premium
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm text-zinc-500">Project Status</p>
                    <p className="mt-2 text-2xl font-bold">In Progress</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm text-zinc-500">Pending Invoice</p>
                    <p className="mt-2 text-2xl font-bold">$250</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65 }}
          className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-14"
        >
          <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_35px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            <div className="mb-8 lg:hidden">
              <Link to="/" className="inline-flex items-center gap-3">
                <img
                  src="/autocore-logo.png"
                  alt="AutoCore"
                  className="h-11 w-auto"
                />
                <div>
                  <p className="text-2xl font-extrabold tracking-tight">
                    Auto<span className="text-red-500">Core</span>
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-400">
                    Systems
                  </p>
                </div>
              </Link>
            </div>

            {registered && (
              <div className="mb-6 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="font-semibold text-emerald-300">
                      Request submitted successfully
                    </p>
                    <p className="mt-1 text-sm text-zinc-300">
                      Your request was saved. You can now sign in or wait for access approval.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-300">
              Welcome back
            </p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight">
              Sign in
            </h2>
            <p className="mt-3 text-zinc-400">
              Enter your credentials to continue into your AutoCore account.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Email
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                  <Mail className="h-4 w-4 text-zinc-500" />
                  <input
                    type="email"
                    placeholder="name@business.com"
                    className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Password
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                  <Lock className="h-4 w-4 text-zinc-500" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-zinc-400">
                  <input type="checkbox" className="accent-red-600" />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-red-300 transition hover:text-red-200"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-3.5 font-semibold text-white shadow-[0_18px_60px_rgba(255,0,0,0.22)] transition hover:scale-[1.01]"
              >
                Sign in
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => navigate("/register")}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Request access
              </button>
              <button
                onClick={() => navigate("/")}
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
              >
                Back to website
              </button>
            </div>
            <p className="mt-6 text-center text-sm text-zinc-500">
  Don’t have an account?{" "}
  <button
    type="button"
    onClick={() => navigate("/register-plus")}
    className="text-red-300 transition hover:text-red-200"
  >
    Request access
  </button>
</p>

            <p className="mt-6 text-center text-sm text-zinc-500">
              Demo access: use{" "}
              <span className="text-red-300">admin@test.com</span> for admin
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}