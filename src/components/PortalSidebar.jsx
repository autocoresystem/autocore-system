export default function PortalSidebar() {
  return (
    <div className="w-64 bg-white/5 border-r border-white/10 p-5">
      <h2 className="text-xl font-bold mb-6">Client</h2>

      <ul className="space-y-3">
        <li>Dashboard</li>
        <li>Invoices</li>
        <li>Payments</li>
        <li>Messages</li>
      </ul>
    </div>
  );
}