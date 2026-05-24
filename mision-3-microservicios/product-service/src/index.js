// product-service/src/index.js
// Microservicio de productos — no sabe nada de auth

import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

let products = [
  { id: 1, name: 'Laptop Pro',       price: 999,  stock: 5,  category: 'electronics' },
  { id: 2, name: 'Teclado Mecánico', price: 129,  stock: 12, category: 'peripherals' },
  { id: 3, name: 'Monitor 4K',       price: 549,  stock: 3,  category: 'electronics' },
]
let nextId = 4

app.get('/', (req, res) => {
  // El usuario autenticado viene del gateway en el header X-User
  const user = req.headers['x-user'] ? JSON.parse(req.headers['x-user']) : null
  console.log(`📦 GET /products | usuario: ${user?.email || 'anónimo'}`)
  res.json({ data: products, total: products.length })
})

app.get('/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id))
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' })
  res.json(product)
})

app.post('/', (req, res) => {
  const { name, price, stock, category } = req.body
  if (!name || !price) return res.status(400).json({ error: 'name y price son requeridos' })
  const product = { id: nextId++, name, price: Number(price), stock: Number(stock) || 0, category: category || 'general' }
  products.push(product)
  res.status(201).json(product)
})

app.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === Number(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' })
  products.splice(index, 1)
  res.json({ message: 'Eliminado' })
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'product-service', products: products.length })
})

app.listen(3020, () => {
  console.log('📦 product-service corriendo en http://localhost:3020')
})
