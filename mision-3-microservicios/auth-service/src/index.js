// auth-service/src/index.js
// Microservicio de autenticación — solo sabe de usuarios y tokens

import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const app = express()
app.use(cors())
app.use(express.json())

const JWT_SECRET = process.env.JWT_SECRET || 'secreto-de-desarrollo-cambiar-en-prod'

// "Base de datos" en memoria (en producción: PostgreSQL, MongoDB, etc.)
const users = []

// ── Registro ──────────────────────────────────────────
app.post('/register', async (req, res) => {
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Faltan campos: name, email, password' })
  }

  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: 'El email ya está registrado' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString()
  }
  users.push(user)

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '24h' })
  console.log(`✅ Nuevo usuario: ${email}`)

  res.status(201).json({
    message: 'Usuario creado',
    token,
    user: { id: user.id, name: user.name, email: user.email }
  })
})

// ── Login ─────────────────────────────────────────────
app.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = users.find(u => u.email === email)
  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' })
  }

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    return res.status(401).json({ error: 'Credenciales inválidas' })
  }

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '24h' })
  console.log(`🔑 Login: ${email}`)

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email }
  })
})

// ── Verificar token (usado por otros servicios o el gateway) ──
app.post('/verify', (req, res) => {
  const { token } = req.body
  if (!token) return res.status(400).json({ error: 'Token requerido' })

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    res.json({ valid: true, user: payload })
  } catch {
    res.status(401).json({ valid: false, error: 'Token inválido o expirado' })
  }
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'auth-service', users: users.length })
})

app.listen(3010, () => {
  console.log('🔐 auth-service corriendo en http://localhost:3010')
})
