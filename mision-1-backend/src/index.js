// Backend simple para Misión 1
// Falla el 30% de las veces

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PRODUCTOS = [
  {
    id: 1,
    name: "Laptop Pro",
    emoji: "💻",
    description: "Potencia para desarrolladores",
    price: 999,
    stock: 5,
  },
  {
    id: 2,
    name: "Teclado Mecánico",
    emoji: "⌨️",
    description: "Switches Cherry MX Blue",
    price: 129,
    stock: 12,
  },
  {
    id: 3,
    name: "Monitor 4K",
    emoji: "🖥️",
    description: "27 pulgadas, 144Hz",
    price: 549,
    stock: 3,
  },
  {
    id: 4,
    name: "Mouse Gamer",
    emoji: "🖱️",
    description: "16000 DPI, RGB",
    price: 79,
    stock: 20,
  },
  {
    id: 5,
    name: "Auriculares",
    emoji: "🎧",
    description: "Cancelación de ruido activa",
    price: 299,
    stock: 0,
  },
  {
    id: 6,
    name: "Webcam HD",
    emoji: "📷",
    description: "1080p, 60fps",
    price: 89,
    stock: 8,
  },
];

// Ruta que falla aleatoriamente (para practicar error handling)
app.get("/api/products", (req, res) => {
  const FAILURE_RATE = 0.3; // 30% de fallos

  if (Math.random() < FAILURE_RATE) {
    console.log("💥 [Simulando error del servidor]");
    return res
      .status(500)
      .json({ error: "Error interno del servidor (simulado)" });
  }

  // Simular latencia de red real
  setTimeout(() => {
    console.log("✅ [Enviando productos]");
    res.json(PRODUCTOS);
  }, 800);
});

// Ruta de salud
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend Misión 1 corriendo en http://localhost:${PORT}`);
  console.log(`⚠️  La API falla el 30% de las veces (a propósito)`);
});
