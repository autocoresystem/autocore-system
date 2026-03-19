import PortalSidebar from "../components/PortalSidebar";

export default function ClientPortal() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <PortalSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">
          Client Portal
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 p-5 rounded-xl">
            <p className="text-zinc-400">Project Status</p>
            <h2 className="text-xl font-bold">In Progress</h2>
          </div>

          <div className="bg-white/5 p-5 rounded-xl">
            <p className="text-zinc-400">Progress</p>
            <h2 className="text-xl font-bold">70%</h2>
          </div>

          <div className="bg-white/5 p-5 rounded-xl">
            <p className="text-zinc-400">Pending Invoice</p>
            <h2 className="text-xl font-bold">$500</h2>
          </div>
        </div>
      </div>
    </div>
  );
}