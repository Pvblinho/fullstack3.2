import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT ?? 3002;

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
});
