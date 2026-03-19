import AdminSidebar from "../components/AdminSidebar";

export default function AdminPortal() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white/5 p-5 rounded-xl">
            <p>Total Clients</p>
            <h2 className="text-xl font-bold">12</h2>
          </div>

          <div className="bg-white/5 p-5 rounded-xl">
            <p>Projects</p>
            <h2 className="text-xl font-bold">8</h2>
          </div>

          <div className="bg-white/5 p-5 rounded-xl">
            <p>Revenue</p>
            <h2 className="text-xl font-bold">$12,000</h2>
          </div>

          <div className="bg-white/5 p-5 rounded-xl">
            <p>Pending</p>
            <h2 className="text-xl font-bold">3</h2>
          </div>
        </div>
      </div>
    </div>
  );
}