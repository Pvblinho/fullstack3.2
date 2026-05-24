# ⚫ MISIÓN 6 — "Black Friday"

## Contexto
> "Son las 11:58pm del 29 de noviembre. En 2 minutos empieza el Black Friday.
>  El año pasado el servidor se cayó a las 12:01am.
>  El CEO está mirando. ¿Qué hacemos?"

## Objetivo
No hay código que entregar. El objetivo es que puedas EXPLICAR y DIBUJAR
las estrategias de escalabilidad. La restricción es que NO sea en PowerPoint.

---

## Concepto 1: Escalabilidad Vertical (Scale Up)

**Idea**: darle más poder a la misma máquina.

```
ANTES:          DESPUÉS:
┌─────────┐     ┌─────────┐
│ 2 cores │ →   │ 16 cores│
│  4 GB   │     │  64 GB  │
│  HDD    │     │  NVMe   │
└─────────┘     └─────────┘
```

**Cuándo usarla**: Base de datos (difícil de distribuir), pico puntual y predecible.
**Límite**: Hay un máximo de hardware. Y cuesta mucho.
**Problema Black Friday**: Si la máquina se cae, se cae TODO.

---

## Concepto 2: Escalabilidad Horizontal (Scale Out)

**Idea**: agregar más máquinas iguales detrás de un balanceador.

```
                    ┌─────────────┐
                    │ Load        │
   Usuarios ──────► │ Balancer    │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
      ┌─────────┐     ┌─────────┐     ┌─────────┐
      │ App #1  │     │ App #2  │     │ App #3  │
      │ :3003   │     │ :3003   │     │ :3003   │
      └─────────┘     └─────────┘     └─────────┘
           │               │               │
           └───────────────┼───────────────┘
                           ▼
                    ┌─────────────┐
                    │  Base de    │
                    │  Datos      │
                    └─────────────┘
```

**Cuándo usarla**: Apps stateless (sin sesión en memoria), tráfico impredecible.
**Ventaja**: Si una instancia se cae, las otras siguen.
**Para Black Friday**: Puedes agregar instancias 1 hora antes y eliminarlas después.

---

## Estrategias adicionales para Black Friday

### Cache (Redis)
```
Request ──► Cache hit? ──► SÍ ──► Devolver respuesta (5ms)
                └── NO ──► Consultar DB ──► Guardar en cache ──► Devolver (200ms)
```
El catálogo de productos NO cambia cada segundo. Guárdalo en cache.

### CDN (Content Delivery Network)
Las imágenes de productos se sirven desde servidores cerca del usuario.
Sin CDN: imágenes desde Santiago para usuarios en Europa = lento.
Con CDN: imágenes desde Frankfurt para usuarios en Europa = rápido.

### Circuit Breaker
Si el servicio de pagos falla, en vez de hacer que todos esperen infinito:
- Después de 5 fallos consecutivos → "abrir el circuito"
- Responder inmediatamente con error (o modo degradado)
- Probar de nuevo cada 30 segundos

---

## Tu entrega para esta misión

Elige UNO de estos formatos:

### Opción A — Pizarra (mejor)
Dibuja el diagrama de escalabilidad horizontal en 5 minutos.
Explícaselo a un compañero. Graba 60 segundos de video.

### Opción B — README con diagramas ASCII
Agrega tu propio diagrama aquí explicando cómo escalarías
la arquitectura de la Misión 3 (microservicios) para Black Friday.

### Opción C — docker-compose con réplicas
```yaml
# Modifica el docker-compose de Misión 5 para correr 3 réplicas:
services:
  backend:
    deploy:
      replicas: 3
```
Agrega nginx como load balancer. Muestra que las 3 instancias responden.

---

## Preguntas que te harán en la entrevista

1. "¿Cuál es el problema de escalar horizontalmente una app con sesiones en memoria?"
2. "¿Qué es un sticky session y por qué es una mala solución?"
3. "¿Cómo decides si usar vertical vs horizontal?"
4. "¿Qué es auto-scaling y qué métrica usarías para dispararlo?"

---

## 🏆 Criterios de éxito
1. ✅ Puedes explicar en 2 minutos la diferencia entre ambas estrategias
2. ✅ Puedes dibujar el diagrama de carga horizontal sin mirar notas
3. ✅ Puedes responder: "¿qué pasa si la DB es el cuello de botella?"
4. ✅ Propones AL MENOS una estrategia adicional (cache, CDN, queue, etc.)
