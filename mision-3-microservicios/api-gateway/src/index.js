// api-gateway/src/index.js
// El gateway es el punto de entrada único.
// Responsabilidades: routing, autenticación de tokens, forward de requests.

import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()
app.use(cors())
app.use(express.json())

const SERVICES = {
  auth:    'http://localhost:3010',
  products: 'http://localhost:3020',
}

// ── Middleware: verificar JWT consultando al auth-service ──
async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token requerido. Usa el header: Authorization: Bearer <token>' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const response = await fetch(`${SERVICES.auth}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    })
    const data = await response.json()

    if (!data.valid) {
      return res.status(401).json({ error: 'Token inválido' })
    }

    // Pasar info del usuario a los servicios internos
    req.user = data.user
    next()
  } catch {
    res.status(503).json({ error: 'auth-service no disponible' })
  }
}

// ── Proxy helper ──────────────────────────────────────
async function proxyTo(serviceUrl, req, res) {
  const url = `${serviceUrl}${req.path}`
  try {
    const headers = { 'Content-Type': 'application/json' }
    if (req.user) headers['X-User'] = JSON.stringify(req.user)

    const response = await fetch(url, {
      method: req.method,
      headers,
      body: ['POST', 'PUT', 'PATCH'].includes(req.method) ? JSON.stringify(req.body) : undefined,
    })

    const data = await response.json()
    res.status(response.status).json(data)
  } catch {
    res.status(503).json({ error: `Servicio no disponible: ${serviceUrl}` })
  }
}

// ── Rutas públicas (sin autenticación) ────────────────
app.post('/auth/register', (req, res) => proxyTo(SERVICES.auth, { ...req, path: '/register' }, res))
app.post('/auth/login',    (req, res) => proxyTo(SERVICES.auth, { ...req, path: '/login' }, res))

// ── Rutas protegidas ──────────────────────────────────
app.use('/products', authenticate, (req, res) => {
  proxyTo(SERVICES.products, req, res)
})

// ── Estado del sistema ────────────────────────────────
app.get('/health', async (req, res) => {
  const checks = await Promise.allSettled([
    fetch(`${SERVICES.auth}/health`).then(r => r.json()),
    fetch(`${SERVICES.products}/health`).then(r => r.json()),
  ])

  res.json({
    gateway: 'ok',
    'auth-service':    checks[0].status === 'fulfilled' ? checks[0].value : 'down',
    'product-service': checks[1].status === 'fulfilled' ? checks[1].value : 'down',
  })
})

app.listen(3000, () => {
  console.log('🌐 api-gateway corriendo en http://localhost:3000')
  console.log('   → Rutas públicas:   POST /auth/register | POST /auth/login')
  console.log('   → Rutas protegidas: GET /products (requiere Bearer token)')
})
