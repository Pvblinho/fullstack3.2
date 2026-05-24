import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import { authenticate } from './middleware/auth.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth',     authRoutes)
app.use('/api/products', productRoutes)

// Ejemplo de ruta completamente protegida
app.get('/api/profile', authenticate, (req, res) => {
  res.json({ message: `Hola ${req.user.name}!`, user: req.user })
})

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'mision-4-auth' }))

app.listen(3003, () => {
  console.log('🔐 Backend Misión 4 en http://localhost:3003')
  console.log('   Rutas públicas:    GET  /api/products')
  console.log('   Rutas protegidas:  POST /api/products (requiere token de admin)')
})
