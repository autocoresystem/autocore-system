import { useMemo } from "react";
import PortalSidebar from "../components/PortalSidebar";
import {
  FolderKanban,
  FileText,
  CreditCard,
  Bell,
  CheckCircle2,
  Clock3,
  MessageCircle,
  Download,
} from "lucide-react";

export default function ClientPortal() {
    const currentUser = useMemo(() => {
    return JSON.parse(localStorage.getItem("autocore_current_user")) || {};
  }, []);

  const timeline = [
    {
      title: "Discovery & planning",
      desc: "We reviewed the business goals, required pages, and client portal structure.",
      progress: "Completed",
    },
    {
      title: "UI design",
      desc: "Main website sections and dashboard layout have been designed.",
      progress: "Completed",
    },
    {
      title: "Portal development",
      desc: "Client portal and admin area are currently being integrated.",
      progress: "In Progress",
    },
    {
      title: "Final review",
      desc: "Pending final testing, revisions, and handoff.",
      progress: "Pending",
    },
  ];

  const invoices = [
    { id: "INV-1008", service: "Client Portal Phase 1", amount: "$250", status: "Pending" },
    { id: "INV-1004", service: "Website Deposit", amount: "$500", status: "Paid" },
    { id: "INV-1002", service: "Brand Setup", amount: "$150", status: "Paid" },
  ];

  const messages = [
    {
      from: "AutoCore Admin",
      text: "We completed the dashboard structure and uploaded the newest preview.",
      time: "2h ago",
    },
    {
      from: "Client",
      text: "Looks great. Please keep the portal layout simple and clean.",
      time: "1d ago",
    },
  ];

  const files = [
    { name: "Homepage Preview.pdf", type: "PDF" },
    { name: "Portal Mockup.png", type: "Image" },
    { name: "Invoice Layout Draft.pdf", type: "PDF" },
  ];

  return (
    <div className="min-h-screen bg-black text-white lg:flex">
      <PortalSidebar />

      <main className="flex-1 p-5 lg:p-8">
       <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">
        Welcome back
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
        {currentUser.business || "Your business portal"}
      </h1>
      <p className="mt-3 max-w-3xl text-zinc-300">
        {currentUser.name
          ? `Hello ${currentUser.name}, here you can review your project progress, invoices, messages, and files.`
          : "Review your latest progress, invoices, messages, and files shared by the AutoCore team."}
      </p>
    </div>

    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4">
      <p className="text-sm text-red-200">Service requested</p>
      <p className="mt-1 text-2xl font-bold">
        {currentUser.service || "Client Portal"}
      </p>
      <p className="text-sm text-zinc-300">Workspace active</p>
    </div>
  </div>
</div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Project Status", value: "In Progress", icon: FolderKanban },
            { label: "Pending Invoice", value: "$250", icon: CreditCard },
            { label: "Paid Invoices", value: "2", icon: CheckCircle2 },
            { label: "Unread Messages", value: "2", icon: Bell },
          ].map((card) => {
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

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Project Timeline</h2>
              <span className="text-sm text-zinc-500">Updated today</span>
            </div>

            <div className="mt-6 space-y-4">
              {timeline.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-sm font-bold text-red-300">
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                            item.progress === "Completed"
                              ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                              : item.progress === "In Progress"
                              ? "border border-amber-500/30 bg-amber-500/10 text-amber-300"
                              : "border border-white/10 bg-white/5 text-zinc-300"
                          }`}
                        >
                          {item.progress}
                        </span>
                      </div>
                      <p className="mt-2 leading-7 text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="space-y-6">
            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Invoices</h2>
                <FileText className="h-5 w-5 text-red-400" />
              </div>

              <div className="mt-5 space-y-3">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="rounded-2xl border border-white/10 bg-black/25 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold">{invoice.id}</p>
                        <p className="text-sm text-zinc-400">{invoice.service}</p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          invoice.status === "Paid"
                            ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                            : "border border-amber-500/30 bg-amber-500/10 text-amber-300"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-sm text-zinc-500">{invoice.amount}</p>
                      <button className="text-sm font-medium text-red-300 hover:text-red-200">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Recent Messages</h2>
                <MessageCircle className="h-5 w-5 text-red-400" />
              </div>

              <div className="mt-5 space-y-3">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-black/25 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{msg.from}</p>
                      <span className="text-xs text-zinc-500">{msg.time}</span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-zinc-400">{msg.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Shared Files</h2>
            <Download className="h-5 w-5 text-red-400" />
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {files.map((file) => (
              <div
                key={file.name}
                className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5"
              >
                <p className="text-sm text-zinc-500">{file.type}</p>
                <p className="mt-2 font-semibold text-white">{file.name}</p>
                <button className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-red-300 hover:text-red-200">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-3">
            <Clock3 className="h-5 w-5 text-red-500" />
            <h2 className="text-2xl font-bold">Next Steps</h2>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              "Finalize client portal UI",
              "Connect invoice workflow",
              "Review final content and deliverables",
            ].map((step) => (
              <div
                key={step}
                className="rounded-2xl border border-white/10 bg-black/25 p-4 text-zinc-300"
              >
                {step}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}