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

// TEST
app.get("/", (req, res) => {
  res.send("AutoCore Backend Running 🚀");
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
    res.status(500).json({
      success: false,
      error: "Database connection failed",
    });
  }
});

// CLIENTES
app.get("/clientes", async (req, res) => {
  const data = await pool.query("SELECT * FROM clientes ORDER BY id DESC");
  res.json(data.rows);
});

app.post("/clientes", async (req, res) => {
  const { nombre, telefono, email } = req.body;

  const data = await pool.query(
    "INSERT INTO clientes(nombre, telefono, email) VALUES($1,$2,$3) RETURNING *",
    [nombre, telefono, email]
  );

  res.json(data.rows[0]);
});

// VEHICULOS
app.get("/vehiculos", async (req, res) => {
  const data = await pool.query("SELECT * FROM vehiculos ORDER BY id DESC");
  res.json(data.rows);
});

app.post("/vehiculos", async (req, res) => {
  const { marca, modelo, ano, precio_compra, precio_esperado, imagen } =
    req.body;

  const data = await pool.query(
    `INSERT INTO vehiculos(marca, modelo, ano, precio_compra, precio_esperado, imagen)
     VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
    [marca, modelo, ano, precio_compra, precio_esperado, imagen]
  );

  res.json(data.rows[0]);
});

// VENTAS
app.get("/ventas", async (req, res) => {
  const data = await pool.query("SELECT * FROM ventas ORDER BY id DESC");
  res.json(data.rows);
});

app.post("/ventas", async (req, res) => {
  const { vehiculo_id, cliente_id, precio_venta, metodo_pago } = req.body;

  const data = await pool.query(
    `INSERT INTO ventas(vehiculo_id, cliente_id, precio_venta, metodo_pago)
     VALUES($1,$2,$3,$4) RETURNING *`,
    [vehiculo_id, cliente_id, precio_venta, metodo_pago]
  );

  res.json(data.rows[0]);
});

// PAGOS
app.post("/pagos", async (req, res) => {
  const { venta_id, monto, metodo_pago } = req.body;

  const data = await pool.query(
    `INSERT INTO pagos(venta_id, monto, metodo_pago)
     VALUES($1,$2,$3) RETURNING *`,
    [venta_id, monto, metodo_pago]
  );

  res.json(data.rows[0]);
});


// GASTOS
app.post("/gastos", async (req, res) => {
  const { venta_id, categoria, monto } = req.body;

  const data = await pool.query(
    `INSERT INTO gastos(venta_id, categoria, monto)
     VALUES($1,$2,$3) RETURNING *`,
    [venta_id, categoria, monto]
  );

  res.json(data.rows[0]);
});

// RESUMEN
app.get("/ventas-resumen", async (req, res) => {
  const data = await pool.query("SELECT * FROM ventas_resumen");
  res.json(data.rows);
});

app.listen(3000, () => {
  console.log("Server running on port 3000 🚀");
});