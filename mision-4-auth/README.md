# 🔴 MISIÓN 4 — "Hackearon la API"

## Contexto
> "Alguien borrió todos los productos anoche. La API era completamente pública.
>  Badge en juego: 🛡️ Security Engineer"

## Objetivo
Agregar autenticación JWT al backend de la Misión 2.

## Endpoints y sus permisos
| Método | Ruta | ¿Requiere auth? | ¿Requiere admin? |
|--------|------|-----------------|------------------|
| GET    | /api/products    | ❌ público | ❌ |
| GET    | /api/products/:id | ❌ público | ❌ |
| POST   | /api/auth/register | ❌ público | ❌ |
| POST   | /api/auth/login | ❌ público | ❌ |
| POST   | /api/products | ✅ sí | ✅ solo admin |
| PUT    | /api/products/:id | ✅ sí | ✅ solo admin |
| DELETE | /api/products/:id | ✅ sí | ✅ solo admin |

## Cómo probar
```bash
npm install && npm start
# API en http://localhost:3003

# 1. Registrarse
curl -X POST http://localhost:3003/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan","email":"juan@test.com","password":"1234","role":"admin"}'

# 2. Login (guarda el token)
curl -X POST http://localhost:3003/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@test.com","password":"1234"}'

# 3. Crear producto (con token)
curl -X POST http://localhost:3003/api/products \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{"name":"Nuevo producto","price":99,"stock":10}'

# 4. Intentar sin token (debe dar 401)
curl -X DELETE http://localhost:3003/api/products/1
```

## Criterios de éxito
1. ✅ Sin token: POST/PUT/DELETE devuelven 401
2. ✅ Con token de usuario normal: POST/PUT/DELETE devuelven 403
3. ✅ Con token de admin: todas las operaciones funcionan
4. ✅ Token expirado: devuelve 401 con mensaje claro
5. ✅ El middleware está separado en su propio archivo

## 🏅 Badge desbloqueado
Completa esta misión para recibir el badge: **🛡️ Security Engineer**
