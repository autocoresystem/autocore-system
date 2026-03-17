import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "white",
      padding: "30px"
    }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
        AutoCore Dashboard
      </h1>

      <div style={{
        marginTop: "20px",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px"
      }}>
        <Card title="Ingresos" value="$12,400" />
        <Card title="Clientes" value="42" />
        <Card title="Vehículos" value="18" />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      style={{
        background: "rgba(255,255,255,0.05)",
        padding: "20px",
        borderRadius: "15px",
        border: "1px solid rgba(255,255,255,0.1)"
      }}
    >
      <h4>{title}</h4>
      <h2>{value}</h2>
    </motion.div>
  );
}