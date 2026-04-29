import { useEffect, useMemo, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import {
  Users,
  FolderKanban,
  CreditCard,
  BadgeDollarSign,
  CheckCircle2,
  Bell,
  MessageCircle,
  ChevronRight,
  TrendingUp,
  CalendarRange,
  Wallet,
  BarChart3,
} from "lucide-react";

export default function AdminPortal() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("autocore_requests")) || [];
    setRequests(saved);
  }, []);

  const currentUser = useMemo(() => {
    return JSON.parse(localStorage.getItem("autocore_current_user")) || {};
  }, []);

  const currentMonthRevenue = "$4,250";
  const currentMonthExpenses = "$1,180";
  const currentMonthNet = "$3,070";

  const monthlyRevenue = [
    { month: "Jan", value: 1200 },
    { month: "Feb", value: 1800 },
    { month: "Mar", value: 2400 },
    { month: "Apr", value: 2900 },
    { month: "May", value: 3600 },
    { month: "Jun", value: 4250 },
  ];

  const monthlyExpenses = [
    { month: "Jan", value: 500 },
    { month: "Feb", value: 700 },
    { month: "Mar", value: 840 },
    { month: "Apr", value: 920 },
    { month: "May", value: 1080 },
    { month: "Jun", value: 1180 },
  ];

  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.value), 1);
  const maxExpenses = Math.max(...monthlyExpenses.map((m) => m.value), 1);

  const clients = useMemo(() => {
    return requests.map((request, index) => ({
      id: request.id || index + 1,
      company: request.business,
      owner: request.owner,
      email: request.email,
      phone: request.phone,
      service: request.service,
      status: "Lead",
      progress: Math.min(20 + index * 12, 90),
    }));
  }, [requests]);

  const internalProjects = [
    {
      company: "Dealer Pro Auto LLC",
      status: "Active",
      project: "Billing + Portal",
      progress: 85,
    },
    {
      company: "Arcy Rent Car",
      status: "Active",
      project: "Internal System",
      progress: 70,
    },
    {
      company: "Elite Detailing",
      status: "Pending",
      project: "Website Proposal",
      progress: 20,
    },
  ];

  const recentPayments = [
    { client: "Dealer Pro Auto LLC", amount: "$500", status: "Paid" },
    { client: "Arcy Rent Car", amount: "$250", status: "Pending" },
    { client: "Elite Detailing", amount: "$150", status: "Pending" },
  ];

  const quickStats = [
    { label: "Total Leads", value: String(requests.length), icon: Bell },
    { label: "Clients / Requests", value: String(clients.length), icon: Users },
    { label: "Open Invoices", value: "6", icon: CreditCard },
    { label: "Revenue This Month", value: currentMonthRevenue, icon: BadgeDollarSign },
  ];

  return (
    <div className="min-h-screen bg-black text-white lg:flex">
      <AdminSidebar />

      <main className="flex-1 p-5 lg:p-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">
                Admin Overview
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
                {currentUser.name
                  ? `Welcome, ${currentUser.name}`
                  : "Manage leads, clients, projects, and monthly performance"}
              </h1>
              <p className="mt-3 max-w-3xl text-zinc-300">
                This is your internal workspace to review incoming requests, monitor client activity, and track revenue growth.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-medium transition hover:bg-white/5">
                Create Client
              </button>
              <button className="rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]">
                New Project
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickStats.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="rounded-[1.7rem] border border-white/10 bg-white/5 p-5"
              >
                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                    <Icon className="h-5 w-5 text-red-500" />
                  </div>
                  <span className="text-sm">{card.label}</span>
                </div>
                <p className="mt-5 text-3xl font-extrabold">{card.value}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.7rem] border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3 text-zinc-300">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                <Wallet className="h-5 w-5 text-red-500" />
              </div>
              <span className="text-sm">Expenses This Month</span>
            </div>
            <p className="mt-5 text-3xl font-extrabold">{currentMonthExpenses}</p>
          </div>

          <div className="rounded-[1.7rem] border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3 text-zinc-300">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                <BarChart3 className="h-5 w-5 text-red-500" />
              </div>
              <span className="text-sm">Net This Month</span>
            </div>
            <p className="mt-5 text-3xl font-extrabold">{currentMonthNet}</p>
          </div>

          <div className="rounded-[1.7rem] border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3 text-zinc-300">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                <FolderKanban className="h-5 w-5 text-red-500" />
              </div>
              <span className="text-sm">Active Internal Projects</span>
            </div>
            <p className="mt-5 text-3xl font-extrabold">{internalProjects.length}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Monthly Revenue</h2>
              <TrendingUp className="h-5 w-5 text-red-400" />
            </div>

            <div className="mt-6 grid h-[260px] grid-cols-6 items-end gap-3">
              {monthlyRevenue.map((item) => (
                <div key={item.month} className="flex h-full flex-col justify-end">
                  <div
                    className="rounded-t-2xl bg-red-600/90"
                    style={{
                      height: `${Math.max((item.value / maxRevenue) * 100, 12)}%`,
                    }}
                  />
                  <div className="mt-3 text-center text-sm text-zinc-400">
                    {item.month}
                  </div>
                  <div className="mt-1 text-center text-xs text-zinc-500">
                    ${item.value}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Payments</h2>
              <CheckCircle2 className="h-5 w-5 text-red-400" />
            </div>

            <div className="mt-5 space-y-3">
              {recentPayments.map((payment, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-black/25 p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{payment.client}</p>
                    <p className="font-bold text-white">{payment.amount}</p>
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">{payment.status}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Monthly Expenses</h2>
              <Wallet className="h-5 w-5 text-red-400" />
            </div>

            <div className="mt-6 grid h-[220px] grid-cols-6 items-end gap-3">
              {monthlyExpenses.map((item) => (
                <div key={item.month} className="flex h-full flex-col justify-end">
                  <div
                    className="rounded-t-2xl bg-zinc-500/80"
                    style={{
                      height: `${Math.max((item.value / maxExpenses) * 100, 12)}%`,
                    }}
                  />
                  <div className="mt-3 text-center text-sm text-zinc-400">
                    {item.month}
                  </div>
                  <div className="mt-1 text-center text-xs text-zinc-500">
                    ${item.value}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Financial Summary</h2>
              <BadgeDollarSign className="h-5 w-5 text-red-400" />
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-sm text-zinc-500">Revenue</p>
                <p className="mt-2 text-2xl font-extrabold">{currentMonthRevenue}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-sm text-zinc-500">Expenses</p>
                <p className="mt-2 text-2xl font-extrabold">{currentMonthExpenses}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-sm text-zinc-500">Net</p>
                <p className="mt-2 text-2xl font-extrabold text-red-400">{currentMonthNet}</p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Incoming Requests</h2>
              <Bell className="h-5 w-5 text-red-400" />
            </div>

            <div className="mt-5 space-y-3">
              {requests.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-black/25 p-5 text-zinc-400">
                  No requests yet. New registrations will appear here.
                </div>
              ) : (
                requests.map((request, index) => (
                  <div
                    key={request.id || index}
                    className="rounded-2xl border border-white/10 bg-black/25 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold">{request.business}</p>
                        <p className="text-sm text-zinc-500">{request.owner}</p>
                      </div>
                      <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-300">
                        {request.status || "New"}
                      </span>
                    </div>

                    <div className="mt-3 grid gap-2 text-sm text-zinc-300">
                      <p>Email: {request.email}</p>
                      <p>Phone: {request.phone}</p>
                      <p>Service: {request.service}</p>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium">
                        Approve
                      </button>
                      <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium">
                        Review
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Clients & Leads</h2>
              <Users className="h-5 w-5 text-red-400" />
            </div>

            <div className="mt-5 space-y-3">
              {[...internalProjects, ...clients].map((client, index) => (
                <div
                  key={`${client.company}-${index}`}
                  className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-lg font-bold">{client.company}</p>
                      <p className="text-sm text-zinc-400">
                        {client.project || client.service || "New inquiry"}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                        client.status === "Active"
                          ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                          : client.status === "Lead"
                          ? "border border-sky-500/30 bg-sky-500/10 text-sky-300"
                          : "border border-amber-500/30 bg-amber-500/10 text-amber-300"
                      }`}
                    >
                      {client.status}
                    </span>
                  </div>

                  <div className="mt-4 h-2 rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-red-500"
                      style={{ width: `${client.progress || 25}%` }}
                    />
                  </div>
                  <p className="mt-2 text-right text-xs text-zinc-500">
                    {client.progress || 25}% progress
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Internal Actions</h2>
            <MessageCircle className="h-5 w-5 text-red-400" />
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              "Approve new client registrations",
              "Create this month invoices",
              "Upload latest preview files",
              "Reply to pending support messages",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 p-4"
              >
                <ChevronRight className="mt-0.5 h-4 w-4 text-red-500" />
                <p className="text-zinc-300">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-3">
            <CalendarRange className="h-5 w-5 text-red-500" />
            <h2 className="text-2xl font-bold">Business Snapshot</h2>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <p className="text-sm text-zinc-500">Total requests received</p>
              <p className="mt-2 text-3xl font-extrabold">{requests.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <p className="text-sm text-zinc-500">Potential clients</p>
              <p className="mt-2 text-3xl font-extrabold">{clients.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <p className="text-sm text-zinc-500">Estimated monthly growth</p>
              <p className="mt-2 text-3xl font-extrabold">+18%</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}