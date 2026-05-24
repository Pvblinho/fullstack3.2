# 🟡 MISIÓN 3 — "La startup creció demasiado"

## Contexto
> "El backend monolítico se cae cada vez que hacemos deploy.
>  Un bug en productos deja sin auth a todos los usuarios.
>  Necesitamos separar los servicios."

## Arquitectura a implementar

```
                    ┌─────────────────┐
   Cliente ──────►  │   API Gateway   │ :3000
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              ▼                             ▼
   ┌──────────────────┐         ┌──────────────────┐
   │   auth-service   │ :3010   │ product-service  │ :3020
   └──────────────────┘         └──────────────────┘
```

## Servicios
| Servicio | Puerto | Responsabilidad |
|---------|--------|-----------------|
| api-gateway | 3000 | Proxy y punto de entrada único |
| auth-service | 3010 | Login, registro, validación JWT |
| product-service | 3020 | CRUD de productos |

## Cómo correr
```bash
# Terminal 1
cd auth-service && npm install && npm start

# Terminal 2
cd product-service && npm install && npm start

# Terminal 3
cd api-gateway && npm install && npm start
```

## Endpoints (todos por el gateway)
```
POST /auth/register
POST /auth/login
GET  /products
GET  /products/:id
```

## Criterios de éxito
1. ✅ Si product-service se cae, el auth sigue funcionando
2. ✅ El cliente SOLO habla con el gateway (nunca directo a los servicios)
3. ✅ Cada servicio tiene su propio package.json y puede desplegarse solo

## Pregunta de reflexión
¿Qué pasa si auth-service se cae mientras alguien navega productos?
¿Cómo lo manejarías? (circuit breaker, cache de tokens, etc.)
