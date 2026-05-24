// ⚠️  CÓDIGO ROTO — Este es el archivo que deben refactorizar
// Todo mezclado: rutas + lógica + datos en un solo archivo

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Los datos mezclados con el código
let products = [
  { id: 1, name: "Laptop Pro", price: 999, stock: 5, category: "electronics" },
  {
    id: 2,
    name: "Teclado Mecánico",
    price: 129,
    stock: 12,
    category: "peripherals",
  },
  { id: 3, name: "Monitor 4K", price: 549, stock: 3, category: "electronics" },
];
let nextId = 4;

// Ruta GET mezclada con lógica
app.get("/api/products", (req, res) => {
  const { category, minPrice, maxPrice } = req.query;
  let result = products;

  // Lógica de negocio mezclada con el acceso a datos
  if (category) {
    result = result.filter((p) => p.category === category);
  }
  if (minPrice) {
    result = result.filter((p) => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    result = result.filter((p) => p.price <= Number(maxPrice));
  }

  res.json({ data: result, total: result.length });
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(product);
});

app.post("/api/products", (req, res) => {
  const { name, price, stock, category } = req.body;

  // Validaciones mezcladas con la ruta
  if (!name || name.trim().length < 2) {
    return res
      .status(400)
      .json({ error: "El nombre debe tener al menos 2 caracteres" });
  }
  if (!price || price <= 0) {
    return res.status(400).json({ error: "El precio debe ser mayor a 0" });
  }
  if (stock === undefined || stock < 0) {
    return res.status(400).json({ error: "El stock no puede ser negativo" });
  }

  const product = {
    id: nextId++,
    name: name.trim(),
    price,
    stock: stock || 0,
    category: category || "general",
  };
  products.push(product);
  res.status(201).json(product);
});

app.put("/api/products/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  const { name, price, stock, category } = req.body;
  if (price !== undefined && price <= 0) {
    return res.status(400).json({ error: "El precio debe ser mayor a 0" });
  }

  products[index] = { ...products[index], ...{ name, price, stock, category } };
  res.json(products[index]);
});

app.delete("/api/products/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  const deleted = products.splice(index, 1);
  res.json({ message: "Eliminado", product: deleted[0] });
});

app.listen(3002, () => console.log("🚀 Puerto 3002"));
