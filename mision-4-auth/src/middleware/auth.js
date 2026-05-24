// src/middleware/auth.js
// Middleware de autenticación y autorización.
// authenticate: verifica que el token JWT sea válido.
// requireAdmin: verifica que el usuario sea admin.

import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secreto-dev-cambiar-en-produccion'

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'No autorizado',
      hint: 'Incluye el header: Authorization: Bearer <token>'
    })
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = payload   // disponible en el controller: req.user.id, req.user.role
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado. Vuelve a iniciar sesión.' })
    }
    return res.status(401).json({ error: 'Token inválido' })
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      error: 'Acceso denegado',
      hint: 'Esta operación requiere rol de administrador'
    })
  }
  next()
}

export { JWT_SECRET }
