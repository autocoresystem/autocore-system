import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;
const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.get("/", (req, res) => {
  res.send("AutoCore Backend NUEVO 123 🚀");
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      success: true,
      message: "Database connected successfully",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ success: false, error: "Database connection failed" });
  }
});

/* ================= VEHÍCULOS ================= */

app.get("/vehiculos", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        v.*,
        COALESCE((SELECT SUM(g.monto) FROM gastos g WHERE g.vehiculo_id = v.id), 0) AS total_gastos,
        COALESCE((SELECT SUM(p.monto) FROM pagos p WHERE p.vehiculo_id = v.id), 0) AS total_pagos,
        COALESCE(v.precio_venta, v.precio_esperado, 0) 
          - COALESCE(v.precio_compra, 0)
          - COALESCE((SELECT SUM(g.monto) FROM gastos g WHERE g.vehiculo_id = v.id), 0) AS ganancia_limpia
      FROM vehiculos v
      ORDER BY v.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Error obteniendo vehículos:", error);
    res.status(500).json({ error: "Error obteniendo vehículos" });
  }
});

app.post("/vehiculos", async (req, res) => {
  try {
    const {
      marca,
      modelo,
      ano,
      color,
      vin,
      millas,
      precio_compra,
      precio_venta,
      precio_esperado,
      imagen,
      estado,
      nota,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO vehiculos 
      (marca, modelo, ano, color, vin, millas, precio_compra, precio_venta, precio_esperado, imagen, estado, nota)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING *
      `,
      [
        marca,
        modelo,
        ano || null,
        color || null,
        vin || null,
        millas || 0,
        precio_compra || 0,
        precio_venta || 0,
        precio_esperado || precio_venta || 0,
        imagen || null,
        estado || "Disponible",
        nota || null,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error creando vehículo:", error);
    res.status(500).json({ error: "Error creando vehículo" });
  }
});

app.get("/vehiculos/:id/detalle", async (req, res) => {
  try {
    const { id } = req.params;

    const vehiculoResult = await pool.query(
      `
      SELECT 
        v.*,
        COALESCE((SELECT SUM(g.monto) FROM gastos g WHERE g.vehiculo_id = v.id), 0) AS total_gastos,
        COALESCE((SELECT SUM(p.monto) FROM pagos p WHERE p.vehiculo_id = v.id), 0) AS total_pagos,
        COALESCE(v.precio_venta, v.precio_esperado, 0) 
          - COALESCE(v.precio_compra, 0)
          - COALESCE((SELECT SUM(g.monto) FROM gastos g WHERE g.vehiculo_id = v.id), 0) AS ganancia_limpia
      FROM vehiculos v
      WHERE v.id = $1
      `,
      [id]
    );

    if (vehiculoResult.rows.length === 0) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }

    const gastosResult = await pool.query(
      "SELECT * FROM gastos WHERE vehiculo_id = $1 ORDER BY id DESC",
      [id]
    );

    const pagosResult = await pool.query(
      "SELECT * FROM pagos WHERE vehiculo_id = $1 ORDER BY id DESC",
      [id]
    );

    res.json({
      vehiculo: vehiculoResult.rows[0],
      gastos: gastosResult.rows,
      pagos: pagosResult.rows,
    });
  } catch (error) {
    console.error("Error obteniendo detalle:", error);
    res.status(500).json({ error: "Error obteniendo detalle del vehículo" });
  }
});

/* ================= GASTOS POR VEHÍCULO ================= */

app.post("/vehiculos/:id/gastos", async (req, res) => {
  try {
    const { id } = req.params;
    const { categoria, descripcion, monto, fecha } = req.body;

    const result = await pool.query(
      `
      INSERT INTO gastos (vehiculo_id, categoria, descripcion, monto, fecha)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [
        id,
        categoria || "General",
        descripcion || "",
        monto || 0,
        fecha || new Date().toISOString().slice(0, 10),
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error agregando gasto:", error);
    res.status(500).json({ error: "Error agregando gasto" });
  }
});

app.delete("/gastos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM gastos WHERE id = $1", [id]);
    res.json({ success: true });
  } catch (error) {
    console.error("Error eliminando gasto:", error);
    res.status(500).json({ error: "Error eliminando gasto" });
  }
});

/* ================= PAGOS POR VEHÍCULO ================= */

app.post("/vehiculos/:id/pagos", async (req, res) => {
  try {
    const { id } = req.params;
    const { monto, metodo_pago, fecha, nota } = req.body;

    const result = await pool.query(
      `
      INSERT INTO pagos (vehiculo_id, monto, metodo_pago, fecha, nota)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [
        id,
        monto || 0,
        metodo_pago || "Efectivo",
        fecha || new Date().toISOString().slice(0, 10),
        nota || "",
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error agregando pago:", error);
    res.status(500).json({ error: "Error agregando pago" });
  }
});

app.delete("/pagos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM pagos WHERE id = $1", [id]);
    res.json({ success: true });
  } catch (error) {
    console.error("Error eliminando pago:", error);
    res.status(500).json({ error: "Error eliminando pago" });
  }
});

/* ================= RESUMEN ================= */

app.get("/dashboard-resumen", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*) AS total_vehiculos,
        COALESCE(SUM(precio_compra), 0) AS total_invertido,
        COALESCE(SUM(COALESCE(precio_venta, precio_esperado, 0)), 0) AS total_venta,
        COALESCE((SELECT SUM(monto) FROM gastos), 0) AS total_gastos,
        COALESCE((SELECT SUM(monto) FROM pagos), 0) AS total_pagos
      FROM vehiculos
    `);

    const row = result.rows[0];

    res.json({
      ...row,
      ganancia_potencial:
        Number(row.total_venta || 0) -
        Number(row.total_invertido || 0) -
        Number(row.total_gastos || 0),
    });
  } catch (error) {
    console.error("Error resumen:", error);
    res.status(500).json({ error: "Error obteniendo resumen" });
  }
});

app.delete("/vehiculos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM vehiculos WHERE id = $1", [id]);

    res.json({ success: true, message: "Vehículo eliminado correctamente" });
  } catch (error) {
    console.error("Error eliminando vehículo:", error);
    res.status(500).json({ error: "Error eliminando vehículo" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});