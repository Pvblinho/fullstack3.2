// src/routes/authRoutes.js

import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../middleware/auth.js'

const router = Router()

// Almacenamiento en memoria (en producción: base de datos)
const users = []

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Campos requeridos: name, email, password' })
  }
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: 'Email ya registrado' })
  }

  const hashed = await bcrypt.hash(password, 10)
  // Nota: en producción NUNCA dejes que el cliente elija su propio rol
  const user = { id: users.length + 1, name, email, password: hashed, role: role || 'user' }
  users.push(user)

  const token = jwt.sign({ id: user.id, email, name, role: user.role }, JWT_SECRET, { expiresIn: '2h' })
  res.status(201).json({ token, user: { id: user.id, name, email, role: user.role } })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email)

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Email o contraseña incorrectos' })
  }

  const token = jwt.sign(
    { id: user.id, email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: '2h' }
  )
  res.json({ token, user: { id: user.id, name: user.name, email, role: user.role } })
})

router.get('/me', (req, res) => {
  // Esta ruta se usa después del middleware authenticate
  res.json({ user: req.user })
})

export default router
