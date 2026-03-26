import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileText,
  CreditCard,
  MessageCircle,
  Settings,
  Home,
} from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();

  const items = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { label: "Clients", icon: Users, href: "/admin" },
    { label: "Projects", icon: FolderKanban, href: "/admin" },
    { label: "Invoices", icon: FileText, href: "/admin" },
    { label: "Payments", icon: CreditCard, href: "/admin" },
    { label: "Messages", icon: MessageCircle, href: "/admin" },
    { label: "Settings", icon: Settings, href: "/admin" },
  ];

  return (
    <aside className="w-full border-b border-white/10 bg-white/5 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="p-5">
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-red-300">
            Admin Panel
          </p>
          <h2 className="mt-2 text-xl font-bold text-white">AutoCore Systems</h2>
          <p className="mt-1 text-sm text-zinc-400">Internal Control Center</p>
        </div>

        <nav className="mt-5 space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.href;

            return (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white transition hover:bg-white/5"
          >
            <Home className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </aside>
  );
}