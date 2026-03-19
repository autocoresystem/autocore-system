export default function AdminSidebar() {
  return (
    <div className="w-64 bg-white/5 border-r border-white/10 p-5">
      <h2 className="text-xl font-bold mb-6">Admin</h2>

      <ul className="space-y-3">
        <li>Clients</li>
        <li>Projects</li>
        <li>Invoices</li>
        <li>Payments</li>
      </ul>
    </div>
  );
}