// src/routes/productRoutes.js
// Las rutas de lectura son públicas. Las de escritura requieren auth + admin.

import { Router } from 'express'
import { authenticate, requireAdmin } from '../middleware/auth.js'

const router = Router()

let products = [
  { id: 1, name: 'Laptop Pro',       price: 999, stock: 5  },
  { id: 2, name: 'Teclado Mecánico', price: 129, stock: 12 },
  { id: 3, name: 'Monitor 4K',       price: 549, stock: 3  },
]
let nextId = 4

// ── Públicas ──────────────────────────────────────────
router.get('/', (req, res) => {
  res.json({ data: products, total: products.length })
})

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id))
  if (!product) return res.status(404).json({ error: 'No encontrado' })
  res.json(product)
})

// ── Protegidas: requieren login + ser admin ────────────
router.post('/', authenticate, requireAdmin, (req, res) => {
  const { name, price, stock } = req.body
  if (!name || !price) return res.status(400).json({ error: 'name y price son requeridos' })
  const product = { id: nextId++, name, price: Number(price), stock: Number(stock) || 0 }
  products.push(product)
  console.log(`➕ Producto creado por ${req.user.email}`)
  res.status(201).json(product)
})

router.put('/:id', authenticate, requireAdmin, (req, res) => {
  const index = products.findIndex(p => p.id === Number(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'No encontrado' })
  products[index] = { ...products[index], ...req.body }
  console.log(`✏️  Producto ${req.params.id} actualizado por ${req.user.email}`)
  res.json(products[index])
})

router.delete('/:id', authenticate, requireAdmin, (req, res) => {
  const index = products.findIndex(p => p.id === Number(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'No encontrado' })
  const deleted = products.splice(index, 1)[0]
  console.log(`🗑️  Producto ${deleted.name} eliminado por ${req.user.email}`)
  res.json({ message: 'Eliminado', product: deleted })
})

export default router
